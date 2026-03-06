import React, { useState } from 'react';
import { TUNING_SYSTEMS } from '../engine/tunings';
import { PROGRESSIONS, getPreferredProgression, getValidNotes } from '../engine/progressions';
import { ARTIST_PROFILES } from '../engine/artists';

/**
 * MbiraDialStation
 * The main DJ station interface. Six dials controlling the mixing engine.
 */
export default function MbiraDialStation() {
  const [tuning, setTuning] = useState('nyamaropa');
  const [progression, setProgression] = useState(4);
  const [voiceBalance, setVoiceBalance] = useState(0.5); // 0=kushaura, 1=kutsinhira
  const [variationDensity, setVariationDensity] = useState('medium');
  const [artistStyle, setArtistStyle] = useState('forward_kwenda');
  const [registerWeight, setRegisterWeight] = useState(0.5); // 0=bass, 1=treble
  const [orchestraMode, setOrchestraMode] = useState(false);

  // When tuning changes, update progression to the preferred one for that tuning
  const handleTuningChange = (newTuning) => {
    setTuning(newTuning);
    setProgression(getPreferredProgression(newTuning));
  };

  const tuningList = Object.values(TUNING_SYSTEMS).sort((a, b) => a.dialPosition - b.dialPosition);
  const artistList = Object.values(ARTIST_PROFILES);

  return (
    <div className="dial-station">
      <h1>Mbira GPT</h1>
      <p className="tagline">The machine that learned the absolute.</p>

      {/* Dial 1: Tuning */}
      <div className="dial-group">
        <label>Tuning System</label>
        <div className="tuning-selector">
          {tuningList.map(t => (
            <button
              key={t.id}
              className={tuning === t.id ? 'active' : ''}
              onClick={() => handleTuningChange(t.id)}
              title={t.character}
            >
              {t.displayName}
            </button>
          ))}
        </div>
        <label className="orchestra-toggle">
          <input
            type="checkbox"
            checked={orchestraMode}
            onChange={e => setOrchestraMode(e.target.checked)}
          />
          Orchestra Mode (Garikayi Tirikoti style)
        </label>
      </div>

      {/* Dial 2: Progression */}
      <div className="dial-group">
        <label>Chord Progression: {progression}</label>
        <input
          type="range" min="1" max="7" step="1"
          value={progression}
          onChange={e => setProgression(Number(e.target.value))}
        />
        <div className="progression-display">
          {PROGRESSIONS[progression]?.join(' → ')}
        </div>
      </div>

      {/* Dial 3: Voice Balance */}
      <div className="dial-group">
        <label>
          Voice: {voiceBalance < 0.3 ? 'Kushaura' : voiceBalance > 0.7 ? 'Kutsinhira' : 'Both'}
        </label>
        <input
          type="range" min="0" max="1" step="0.01"
          value={voiceBalance}
          onChange={e => setVoiceBalance(Number(e.target.value))}
        />
      </div>

      {/* Dial 4: Variation Density */}
      <div className="dial-group">
        <label>Variation Density: {variationDensity}</label>
        <div className="density-selector">
          {['sparse', 'medium', 'dense'].map(d => (
            <button
              key={d}
              className={variationDensity === d ? 'active' : ''}
              onClick={() => setVariationDensity(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Dial 5: Artist Style */}
      <div className="dial-group">
        <label>Artist Style</label>
        <div className="artist-selector">
          {artistList.map(a => (
            <button
              key={a.id}
              className={artistStyle === a.id ? 'active' : ''}
              onClick={() => setArtistStyle(a.id)}
            >
              {a.displayName}
            </button>
          ))}
        </div>
      </div>

      {/* Dial 6: Register Weight */}
      <div className="dial-group">
        <label>
          Register: {registerWeight < 0.3 ? 'Bass heavy' : registerWeight > 0.7 ? 'Treble bright' : 'Balanced'}
        </label>
        <input
          type="range" min="0" max="1" step="0.01"
          value={registerWeight}
          onChange={e => setRegisterWeight(Number(e.target.value))}
        />
      </div>

      {/* State Display */}
      <div className="engine-state">
        <h3>Active State</h3>
        <pre>{JSON.stringify({
          tuning,
          progression,
          activeChords: PROGRESSIONS[progression],
          voiceBalance: voiceBalance < 0.3 ? 'kushaura' : voiceBalance > 0.7 ? 'kutsinhira' : 'both',
          variationDensity,
          artistStyle,
          registerWeight: registerWeight < 0.3 ? 'bass' : registerWeight > 0.7 ? 'treble' : 'balanced',
          orchestraMode,
        }, null, 2)}</pre>
      </div>
    </div>
  );
}
