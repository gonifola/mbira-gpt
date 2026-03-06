import React from 'react';

/**
 * Single mixer strip — Ableton-style vertical channel.
 */
function MixerStrip({ label, volume, onVolumeChange, muted, onMute, solo, onSolo, color, active }) {
  return (
    <div className={`mixer-strip ${muted ? 'muted' : ''} ${active ? 'active' : ''}`}>
      <div className="strip-name" style={{ borderTop: `2px solid ${color}` }}>{label}</div>
      <div className="strip-buttons">
        <button className={`strip-btn solo ${solo ? 'active' : ''}`} onClick={onSolo}>S</button>
        <button className={`strip-btn mute ${muted ? 'active' : ''}`} onClick={onMute}>M</button>
      </div>
      <div className="strip-fader">
        <input
          type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => onVolumeChange(Number(e.target.value))}
          orient="vertical"
          style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
        />
        <div className="strip-level">{Math.round(volume * 100)}</div>
      </div>
    </div>
  );
}

/**
 * Full mixer section — 4 channels: Kushaura, Kutsinhira, Bass, Treble.
 */
export default function Mixer({ mixerState, onMixerChange }) {
  const channels = [
    { id: 'kushaura',   label: 'Kushaura',  color: '#c8a84b' },
    { id: 'kutsinhira', label: 'Kutsinhira',color: '#4bc8a8' },
    { id: 'bass',       label: 'Bass',      color: '#4b8ac8' },
    { id: 'treble',     label: 'Treble',    color: '#c84bc8' },
  ];

  return (
    <div className="mixer">
      <div className="mixer-header">MIXER</div>
      <div className="mixer-strips">
        {channels.map(ch => (
          <MixerStrip
            key={ch.id}
            label={ch.label}
            color={ch.color}
            volume={mixerState[ch.id]?.volume ?? 1}
            muted={mixerState[ch.id]?.muted ?? false}
            solo={mixerState[ch.id]?.solo ?? false}
            active={!mixerState[ch.id]?.muted}
            onVolumeChange={v => onMixerChange(ch.id, 'volume', v)}
            onMute={() => onMixerChange(ch.id, 'muted', !mixerState[ch.id]?.muted)}
            onSolo={() => onMixerChange(ch.id, 'solo', !mixerState[ch.id]?.solo)}
          />
        ))}
      </div>
    </div>
  );
}
