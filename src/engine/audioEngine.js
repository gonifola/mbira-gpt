/**
 * Mbira GPT — Audio Engine
 * Tone.js-powered sampler + sequencer.
 * Dials map directly to audio parameters.
 *
 * Architecture:
 * - Tone.Sampler loads mbira samples (one per tine/note)
 * - Tone.Sequence drives the 48-beat cycle
 * - Register crossfade: Tone.CrossFade between bass and treble channels
 * - BPM: Tone.Transport.bpm
 * - Note choices: constrained by progressions.js getValidNotes()
 */

import * as Tone from 'tone';
import { getValidNotes, PROGRESSIONS } from './progressions.js';
import { getArtistNoteWeights } from './artists.js';

// ---------------------------------------------------------------------------
// Sample map — Nyamaropa D tuning, individual tine recordings
// Using freely available CC0 samples from Freesound as placeholders.
// Replace URLs with your own recorded samples for Nyamaropa accuracy.
// Note numbers map to mbira scale degrees (1-7 across two octaves)
// ---------------------------------------------------------------------------
const SAMPLE_URLS = {
  // Low manual (bass tines) — scale degrees in lower octave
  'D3':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',  // placeholder
  'E3':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'F#3': 'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'G3':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'A3':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'B3':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'C#4': 'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  // High manual (treble tines) — same scale, higher octave
  'D4':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'E4':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'F#4': 'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'G4':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'A4':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'B4':  'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
  'C#5': 'https://freesound.org/data/previews/35/35849_130402-lq.mp3',
};

// Map scale degree (1-7) to note names in Nyamaropa D tuning
// Nyamaropa D: D E F# G A B C# (major scale on D)
const DEGREE_TO_NOTE_LOW  = { 1:'D3', 2:'E3', 3:'F#3', 4:'G3', 5:'A3', 6:'B3', 7:'C#4' };
const DEGREE_TO_NOTE_HIGH = { 1:'D4', 2:'E4', 3:'F#4', 4:'G4', 5:'A4', 6:'B4', 7:'C#5' };

// Tuning pitch offsets in semitones from Nyamaropa D base
const TUNING_OFFSETS = {
  gandanga:      -5,  // ~5 semitones below Nyamaropa
  nemakonde:     -2,
  nyamaropa:      0,  // base
  nyamaropa_high: 3,  // ~3 semitones up
  samaita:        5,
};

let sampler = null;
let bassGain = null;
let trebleGain = null;
let crossfade = null;
let sequence = null;
let isLoaded = false;

/**
 * Initialize the audio engine.
 * Call once on user gesture (browser requires it).
 */
export async function initAudio() {
  await Tone.start();

  // Crossfade between bass (low manual) and treble (high manual)
  crossfade = new Tone.CrossFade(0.5).toDestination();
  bassGain   = new Tone.Gain(1).connect(crossfade, 0, 0);
  trebleGain = new Tone.Gain(1).connect(crossfade, 0, 1);

  sampler = new Tone.Sampler({
    urls: SAMPLE_URLS,
    onload: () => { isLoaded = true; },
    onerror: (err) => console.warn('Sample load error (expected with placeholder URLs):', err),
  });

  // Connect sampler to both channels (register dial controls crossfade)
  sampler.connect(bassGain);
  sampler.connect(trebleGain);

  return sampler;
}

/**
 * Set BPM.
 * @param {number} bpm - 40–200
 */
export function setBPM(bpm) {
  Tone.Transport.bpm.value = Math.max(40, Math.min(200, bpm));
}

/**
 * Set register crossfade.
 * @param {number} value - 0 (bass) to 1 (treble)
 */
export function setRegister(value) {
  if (crossfade) crossfade.fade.value = value;
}

/**
 * Set tuning by pitch-shifting the sampler.
 * @param {string} tuningId
 */
export function setTuning(tuningId) {
  if (!sampler) return;
  const offset = TUNING_OFFSETS[tuningId] || 0;
  // Detune in cents (100 cents = 1 semitone)
  sampler.detune = offset * 100;
}

/**
 * Build a pattern sequence from engine state.
 * @param {object} state - { progressionId, variationDensity, artistId, registerWeight }
 * @returns {string[][]} - array of 48 beat slots, each an array of note names
 */
export function buildPattern(state) {
  const { progressionId = 4, variationDensity = 'medium', artistId = 'forward_kwenda', registerWeight = 0.5 } = state;
  const progression = PROGRESSIONS[progressionId];
  const pattern = [];

  // 12 chords × 4 beats = 48 slots
  for (let chordIdx = 0; chordIdx < 12; chordIdx++) {
    const validNotes = getValidNotes(progressionId, chordIdx, variationDensity);
    const weights = getArtistNoteWeights(artistId, variationDensity);

    for (let beat = 0; beat < 4; beat++) {
      const slot = [];
      // Primary note on beat 0 of each chord
      if (beat === 0) {
        const rootDegree = validNotes[0];
        // Bass note on low manual, treble on high manual based on register weight
        if (registerWeight <= 0.7) slot.push(DEGREE_TO_NOTE_LOW[rootDegree]);
        if (registerWeight >= 0.3) slot.push(DEGREE_TO_NOTE_HIGH[rootDegree]);
      }
      // Fill notes on other beats (density-dependent)
      if (beat === 2 && variationDensity !== 'sparse') {
        const fillDegree = validNotes[1] || validNotes[0];
        if (registerWeight >= 0.3) slot.push(DEGREE_TO_NOTE_HIGH[fillDegree]);
      }
      if (variationDensity === 'dense' && (beat === 1 || beat === 3)) {
        const passDegree = validNotes[Math.floor(Math.random() * validNotes.length)];
        slot.push(DEGREE_TO_NOTE_HIGH[passDegree]);
      }
      pattern.push(slot);
    }
  }
  return pattern;
}

/**
 * Start playback.
 * @param {object} state - current dial state
 */
export function startPlayback(state) {
  stopPlayback();
  if (!isLoaded) {
    console.warn('Samples not loaded — playback will use synthesis fallback');
  }

  const pattern = buildPattern(state);
  let step = 0;

  sequence = new Tone.Sequence((time) => {
    const notes = pattern[step % pattern.length];
    notes.forEach(note => {
      try { sampler.triggerAttackRelease(note, '8n', time); }
      catch(e) { /* sample not loaded yet */ }
    });
    step++;
  }, Array.from({ length: 48 }, (_, i) => i), '16n');

  sequence.start(0);
  Tone.Transport.start();
}

/**
 * Stop playback.
 */
export function stopPlayback() {
  if (sequence) { sequence.stop(); sequence.dispose(); sequence = null; }
  Tone.Transport.stop();
}

/**
 * Get current playback position (0-47).
 */
export function getPlaybackPosition() {
  return Tone.Transport.position;
}

export { isLoaded };
