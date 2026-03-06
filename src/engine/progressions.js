/**
 * Mbira Chord Progressions Engine
 * Core theory constraint system for the DJ station mixing engine.
 * 
 * Each progression is a 12-chord sequence.
 * Each chord lasts 4 beats (except Tadzungaira = 6 beats).
 * 12 chords x 4 beats = 48-beat cycle.
 * 
 * Source: mbiramagic.com / mbira.online
 */

// The 7 chord definitions: [root, third, fifth]
const CHORDS = {
  1: [1, 3, 5],
  2: [2, 4, 6],
  3: [3, 5, 7],
  4: [4, 6, 1], // crosses octave
  5: [5, 7, 2],
  6: [6, 1, 3],
  7: [7, 2, 4],
};

// Preferred notes within each chord (roots and fifths)
const PREFERRED_NOTES = {
  1: [1, 5],
  2: [2, 6],
  3: [3, 7],
  4: [4, 1],
  5: [5, 2],
  6: [6, 3],
  7: [7, 4],
};

// The 7 song progressions (12 chords each)
// Progression 1: the base pattern. Others are transpositions.
const PROGRESSIONS = {
  1: [1, 3, 5, 1, 3, 6, 1, 4, 6, 2, 4, 6],
  2: [2, 4, 6, 2, 4, 7, 2, 5, 7, 3, 5, 7],
  3: [3, 5, 7, 3, 5, 1, 3, 6, 1, 4, 6, 1],
  4: [4, 6, 1, 4, 6, 2, 4, 7, 2, 5, 7, 2], // Nhemamusasa, Tadzungaira (Nyamaropa)
  5: [5, 7, 2, 5, 7, 3, 5, 1, 3, 6, 1, 3], // Nhemamusasa Yepasi (ancient version)
  6: [6, 1, 3, 6, 1, 4, 6, 2, 4, 7, 2, 4], // Tadzungaira (Nemakonde)
  7: [7, 2, 4, 7, 2, 5, 7, 3, 5, 1, 3, 5],
};

// Tuning system to root-feel note and preferred progression mapping
const TUNING_ROOTS = {
  nyamaropa: { rootNote: 4, preferredProgression: 4 },
  nyamaropa_high: { rootNote: 4, preferredProgression: 4 },
  gandanga: { rootNote: 6, preferredProgression: 6 },
  mavembe: { rootNote: 6, preferredProgression: 6 },
  nemakonde: { rootNote: 6, preferredProgression: 6 }, // Gandanga family
  samaita: { rootNote: 4, preferredProgression: 4 }, // TBD - verify
};

/**
 * Get valid note choices for a given position in a progression.
 * @param {number} progressionId - 1-7
 * @param {number} position - 0-11 (position in the 12-chord cycle)
 * @param {string} variationDensity - 'sparse' | 'medium' | 'dense'
 * @returns {number[]} valid note numbers
 */
export function getValidNotes(progressionId, position, variationDensity = 'medium') {
  const progression = PROGRESSIONS[progressionId];
  const chordId = progression[position];
  
  if (variationDensity === 'sparse') {
    // Roots and fifths only (most traditional)
    return PREFERRED_NOTES[chordId];
  } else if (variationDensity === 'medium') {
    // Full chord tones
    return CHORDS[chordId];
  } else {
    // Dense: full chord + passing notes from adjacent chords
    const prevChord = progression[(position - 1 + 12) % 12];
    const nextChord = progression[(position + 1) % 12];
    const passingNotes = [...new Set([
      ...CHORDS[chordId],
      ...CHORDS[prevChord],
      ...CHORDS[nextChord],
    ])];
    return passingNotes;
  }
}

/**
 * Get the preferred progression for a tuning system.
 * @param {string} tuningSystem
 * @returns {number} progression id
 */
export function getPreferredProgression(tuningSystem) {
  return TUNING_ROOTS[tuningSystem]?.preferredProgression || 4;
}

/**
 * Get all songs that use a given progression.
 * @param {number} progressionId
 * @returns {string[]} song names
 */
export function getSongsByProgression(progressionId) {
  const songMap = {
    4: ['Nhemamusasa', 'Tadzungaira (Nyamaropa)'],
    5: ['Nhemamusasa Yepasi'],
    6: ['Tadzungaira (Nemakonde)'],
    // expand as corpus grows
  };
  return songMap[progressionId] || [];
}

export { CHORDS, PREFERRED_NOTES, PROGRESSIONS, TUNING_ROOTS };
