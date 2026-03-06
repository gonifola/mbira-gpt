import React from 'react';
import { TUNING_SYSTEMS } from '../engine/tunings.js';
import { ARTIST_PROFILES } from '../engine/artists.js';
import { PROGRESSIONS, getPreferredProgression } from '../engine/progressions.js';

/**
 * Device Rack — Ableton-style device chain at the bottom.
 * Houses the 6 theory dials.
 */
export default function DeviceRack({ state, onChange }) {
  const {
    tuning, progression, voiceBalance,
    variationDensity, artistStyle, registerWeight, orchestraMode
  } = state;

  const tuningList = Object.values(TUNING_SYSTEMS).sort((a, b) => a.dialPosition - b.dialPosition);
  const artistList = Object.values(ARTIST_PROFILES);

  const handleTuning = (newTuning) => {
    onChange('tuning', newTuning);
    onChange('progression', getPreferredProgression(newTuning));
  };

  return (
    <div className="device-rack">
      <div className="device-rack-header">MBIRA GPT <span className="device-tagline">— theory engine</span></div>

      <div className="device-body">
        {/* Tuning */}
        <div className="device-param">
          <label>TUNING</label>
          <div className="param-buttons">
            {tuningList.map(t => (
              <button key={t.id} className={tuning === t.id ? 'active' : ''}
                onClick={() => handleTuning(t.id)} title={t.character}>
                {t.displayName.split(' ')[0]}
              </button>
            ))}
          </div>
          <label className="orch-toggle">
            <input type="checkbox" checked={orchestraMode}
              onChange={e => onChange('orchestraMode', e.target.checked)} />
            ORCH
          </label>
        </div>

        {/* Progression */}
        <div className="device-param">
          <label>PROGRESSION <span className="param-val">{progression}</span></label>
          <input type="range" min="1" max="7" step="1" value={progression}
            onChange={e => onChange('progression', Number(e.target.value))} />
          <div className="prog-preview">{PROGRESSIONS[progression]?.slice(0,6).join(' ')+'…'}</div>
        </div>

        {/* Voice */}
        <div className="device-param">
          <label>VOICE <span className="param-val">
            {voiceBalance < 0.3 ? 'KUSH' : voiceBalance > 0.7 ? 'KUTS' : 'BOTH'}
          </span></label>
          <input type="range" min="0" max="1" step="0.01" value={voiceBalance}
            onChange={e => onChange('voiceBalance', Number(e.target.value))} />
        </div>

        {/* Density */}
        <div className="device-param">
          <label>DENSITY</label>
          <div className="param-buttons">
            {['sparse','medium','dense'].map(d => (
              <button key={d} className={variationDensity === d ? 'active' : ''}
                onClick={() => onChange('variationDensity', d)}>
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Artist */}
        <div className="device-param wide">
          <label>STYLE</label>
          <div className="param-buttons">
            {artistList.map(a => (
              <button key={a.id} className={artistStyle === a.id ? 'active' : ''}
                onClick={() => onChange('artistStyle', a.id)}>
                {a.displayName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Register */}
        <div className="device-param">
          <label>REGISTER <span className="param-val">
            {registerWeight < 0.3 ? 'BASS' : registerWeight > 0.7 ? 'TREBLE' : 'MID'}
          </span></label>
          <input type="range" min="0" max="1" step="0.01" value={registerWeight}
            onChange={e => onChange('registerWeight', Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
