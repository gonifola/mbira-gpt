import React from 'react';

/**
 * Transport bar — Ableton-style top bar.
 * Play/Stop, BPM, loop toggle, position display.
 */
export default function Transport({ bpm, setBPM, isPlaying, onPlay, onStop, position }) {
  return (
    <div className="transport">
      <div className="transport-left">
        <button className={`transport-btn play ${isPlaying ? 'active' : ''}`} onClick={onPlay}>
          ▶
        </button>
        <button className={`transport-btn stop ${!isPlaying ? 'active' : ''}`} onClick={onStop}>
          ■
        </button>
      </div>

      <div className="transport-center">
        <div className="bpm-control">
          <label>BPM</label>
          <input
            type="number" min="40" max="200" step="1"
            value={bpm}
            onChange={e => setBPM(Number(e.target.value))}
          />
          <input
            type="range" min="40" max="200" step="1"
            value={bpm}
            onChange={e => setBPM(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="transport-right">
        <div className="position-display">
          {isPlaying ? `● ${position}` : '○ STOPPED'}
        </div>
        <div className="cycle-label">48-beat cycle</div>
      </div>
    </div>
  );
}
