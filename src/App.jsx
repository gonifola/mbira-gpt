import React, { useState, useEffect, useRef, useCallback } from 'react';
import Transport from './components/Transport.jsx';
import ClipLauncher from './components/ClipLauncher.jsx';
import Mixer from './components/MixerStrip.jsx';
import PatternDisplay from './components/PatternDisplay.jsx';
import DeviceRack from './components/DeviceRack.jsx';
import {
  initAudio, startPlayback, stopPlayback,
  setBPM, setRegister, setTuning
} from './engine/audioEngine.js';
import './App.css';

const DEFAULT_ENGINE_STATE = {
  tuning: 'nyamaropa',
  progression: 4,
  voiceBalance: 0.5,
  variationDensity: 'medium',
  artistStyle: 'forward_kwenda',
  registerWeight: 0.5,
  orchestraMode: false,
};

const DEFAULT_MIXER = {
  kushaura:   { volume: 1, muted: false, solo: false },
  kutsinhira: { volume: 0.8, muted: false, solo: false },
  bass:       { volume: 0.9, muted: false, solo: false },
  treble:     { volume: 0.9, muted: false, solo: false },
};

export default function App() {
  const [engineState, setEngineState] = useState(DEFAULT_ENGINE_STATE);
  const [mixer, setMixer] = useState(DEFAULT_MIXER);
  const [bpm, setBPMState] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [activeClipId, setActiveClipId] = useState(null);
  const [audioReady, setAudioReady] = useState(false);
  const beatRef = useRef(0);
  const rafRef = useRef(null);

  const handleEngineChange = useCallback((key, value) => {
    setEngineState(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleBPM = useCallback((val) => {
    setBPMState(val);
    setBPM(val);
  }, []);

  const handlePlay = useCallback(async () => {
    if (!audioReady) {
      await initAudio();
      setAudioReady(true);
    }
    setTuning(engineState.tuning);
    setRegister(engineState.registerWeight);
    setBPM(bpm);
    startPlayback(engineState);
    setIsPlaying(true);

    // Animate beat counter
    let beat = 0;
    const tick = () => {
      beat = (beat + 1) % 48;
      setCurrentBeat(beat);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [audioReady, engineState, bpm]);

  const handleStop = useCallback(() => {
    stopPlayback();
    setIsPlaying(false);
    setCurrentBeat(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const handleLaunchClip = useCallback(async (clip) => {
    setActiveClipId(clip.id);
    const newState = {
      ...engineState,
      tuning: clip.tuning,
      progression: clip.progression,
      artistStyle: clip.artist,
      variationDensity: clip.density,
      orchestraMode: clip.orchestra || false,
    };
    setEngineState(newState);
    if (isPlaying) {
      stopPlayback();
      setTuning(clip.tuning);
      startPlayback(newState);
    }
  }, [engineState, isPlaying]);

  const handleMixerChange = useCallback((channelId, key, value) => {
    setMixer(prev => ({
      ...prev,
      [channelId]: { ...prev[channelId], [key]: value }
    }));
    // Register dial also drives audio engine crossfade
    if (channelId === 'bass' || channelId === 'treble') {
      setRegister(mixer.treble?.volume ?? 0.5);
    }
  }, [mixer]);

  // Sync register dial → audio
  useEffect(() => {
    if (audioReady) setRegister(engineState.registerWeight);
  }, [engineState.registerWeight, audioReady]);

  // Sync tuning → audio
  useEffect(() => {
    if (audioReady) setTuning(engineState.tuning);
  }, [engineState.tuning, audioReady]);

  return (
    <div className="app">
      {/* Transport Bar */}
      <Transport
        bpm={bpm} setBPM={handleBPM}
        isPlaying={isPlaying}
        onPlay={handlePlay} onStop={handleStop}
        position={currentBeat}
      />

      {/* Main Area: Clip Launcher + Mixer */}
      <div className="main-area">
        <ClipLauncher activeClipId={activeClipId} onLaunchClip={handleLaunchClip} />
        <Mixer mixerState={mixer} onMixerChange={handleMixerChange} />
      </div>

      {/* Pattern Display */}
      <PatternDisplay
        progressionId={engineState.progression}
        currentBeat={currentBeat}
        isPlaying={isPlaying}
      />

      {/* Device Rack */}
      <DeviceRack state={engineState} onChange={handleEngineChange} />

      {!audioReady && (
        <div className="audio-hint">▶ Press play to initialize audio</div>
      )}
    </div>
  );
}
