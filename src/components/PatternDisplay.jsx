import React from 'react';
import { PROGRESSIONS } from '../engine/progressions.js';

/**
 * Rolling 48-beat cycle display.
 * Shows the active chord progression as colored blocks.
 * Current playback position highlighted.
 */
export default function PatternDisplay({ progressionId, currentBeat, isPlaying }) {
  const progression = PROGRESSIONS[progressionId] || PROGRESSIONS[4];

  // 12 chords × 4 beats
  const beats = [];
  for (let i = 0; i < 12; i++) {
    for (let b = 0; b < 4; b++) {
      beats.push({ chord: progression[i], chordIdx: i, beat: b, absoluteIdx: i * 4 + b });
    }
  }

  const chordColors = {
    1: '#c8a84b', 2: '#a8c84b', 3: '#4bc8a8',
    4: '#4b8ac8', 5: '#8a4bc8', 6: '#c84bc8', 7: '#c84b4b',
  };

  return (
    <div className="pattern-display">
      <div className="pattern-label">PROGRESSION {progressionId} — 48-beat cycle</div>
      <div className="pattern-grid">
        {beats.map(({ chord, chordIdx, beat, absoluteIdx }) => (
          <div
            key={absoluteIdx}
            className={`beat-cell ${beat === 0 ? 'chord-start' : ''} ${isPlaying && absoluteIdx === currentBeat ? 'current' : ''}`}
            style={{ background: beat === 0 ? chordColors[chord] : `${chordColors[chord]}44` }}
            title={`Chord ${chord}, beat ${beat + 1}`}
          >
            {beat === 0 ? chord : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
