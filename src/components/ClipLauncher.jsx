import React from 'react';
import { TUNING_SYSTEMS } from '../engine/tunings.js';

// Preset clips — each is a named dial state combo
const CLIPS = [
  { id: 'nhema_nyamaropa',    label: 'Nhemamusasa',    tuning: 'nyamaropa',      progression: 4, artist: 'forward_kwenda',     density: 'sparse',  color: '#c8a84b' },
  { id: 'nhema_yepasi',       label: 'Nhema Yepasi',   tuning: 'nyamaropa',      progression: 5, artist: 'muda_magaya',        density: 'medium', color: '#e8c84b' },
  { id: 'tadz_nyamaropa',     label: 'Tadzungaira',    tuning: 'nyamaropa',      progression: 4, artist: 'forward_kwenda',     density: 'sparse',  color: '#4bc8a8' },
  { id: 'tadz_nemakonde',     label: 'Tadz (Nemakonde)',tuning: 'nemakonde',     progression: 6, artist: 'forward_kwenda',     density: 'medium', color: '#4b8ac8' },
  { id: 'bangidza_nyama',     label: 'Bangidza',       tuning: 'nyamaropa',      progression: 4, artist: 'muda_magaya',        density: 'medium', color: '#c84bc8' },
  { id: 'bangidza_gandanga',  label: 'Bangidza (Low)', tuning: 'gandanga',       progression: 6, artist: 'tute_chigamba',      density: 'sparse',  color: '#8a4bc8' },
  { id: 'garikayi_orch',      label: 'Orchestra Mode', tuning: 'nyamaropa',      progression: 4, artist: 'garikayi_tirikoti',  density: 'dense',   color: '#c84b4b', orchestra: true },
  { id: 'chris_fusion',       label: 'Chris Berry',    tuning: 'nyamaropa_high', progression: 4, artist: 'chris_berry',        density: 'dense',   color: '#4bc84b' },
];

export default function ClipLauncher({ activeClipId, onLaunchClip }) {
  return (
    <div className="clip-launcher">
      <div className="clip-launcher-header">
        <span>SESSION</span>
      </div>
      <div className="clip-grid">
        {CLIPS.map(clip => (
          <button
            key={clip.id}
            className={`clip-cell ${activeClipId === clip.id ? 'active' : ''}`}
            style={{ '--clip-color': clip.color }}
            onClick={() => onLaunchClip(clip)}
            title={`${clip.tuning} / Progression ${clip.progression} / ${clip.artist}`}
          >
            <span className="clip-label">{clip.label}</span>
            <span className="clip-meta">Prog {clip.progression} · {clip.tuning.replace('_', ' ')}</span>
            {clip.orchestra && <span className="clip-badge">ORCH</span>}
          </button>
        ))}
        {/* Empty slots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <button key={`empty-${i}`} className="clip-cell empty">+</button>
        ))}
      </div>
    </div>
  );
}

export { CLIPS };
