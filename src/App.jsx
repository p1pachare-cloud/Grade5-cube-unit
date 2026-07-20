import { useState, useCallback, useEffect } from 'react';
import { stopNarration } from './utils/audio';
import FloatingNumbers from './components/FloatingNumbers';
import IntroScreen from './components/IntroScreen';
import WonderPhase from './components/phases/WonderPhase';
import StoryPhase from './components/phases/StoryPhase';
import SimulatePhase from './components/phases/SimulatePhase';
import PlayPhase from './components/phases/PlayPhase';
import ReflectPhase from './components/phases/ReflectPhase';

const PHASES = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];

const JOURNEY_ITEMS = [
  { icon: '🔍', label: 'Wonder' },
  { icon: '📖', label: 'Story' },
  { icon: '🧪', label: 'Simulate' },
  { icon: '🎮', label: 'Play' },
  { icon: '📓', label: 'Reflect' },
];

export default function App() {
  const [phase, setPhase] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('phase');
    return PHASES.includes(p) ? p : 'intro';
  });
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [playStats, setPlayStats] = useState(null);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      if (prev) stopNarration();
      return !prev;
    });
  }, []);

  const goHome = useCallback(() => {
    stopNarration();
    setPhase('intro');
    setPlayStats(null);
  }, []);

  const restart = useCallback(() => {
    stopNarration();
    setPhase('wonder');
    setPlayStats(null);
  }, []);

  useEffect(() => {
    return () => stopNarration();
  }, []);

  const phaseIndex = PHASES.indexOf(phase);
  const showJourney = phase !== 'intro';

  return (
    <>
      <FloatingNumbers />
      <div className="app-container">
        {/* Audio Toggle Button */}
        <button
          type="button"
          className="audio-toggle-btn"
          onClick={toggleAudio}
          title={audioEnabled ? 'Mute Narration' : 'Unmute Narration'}
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>

        {/* Home Button */}
        {showJourney && (
          <button type="button" className="home-btn" onClick={goHome} title="Return Home">
            🏠
          </button>
        )}

        {/* Top Journey Progress Tracker */}
        {showJourney && (
          <div className="journey-bar">
            {JOURNEY_ITEMS.map((item, i) => {
              const stepPhaseIndex = i + 1; // wonder=1, story=2, etc.
              const isActive = phaseIndex === stepPhaseIndex;
              const isCompleted = phaseIndex > stepPhaseIndex;
              const targetPhase = PHASES[stepPhaseIndex];

              return (
                <div
                  key={i}
                  className={`journey-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    stopNarration();
                    setPhase(targetPhase);
                  }}
                >
                  <span className="journey-step-dot">{item.icon}</span>
                  <span className="journey-step-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Phase Screen Routing */}
        {phase === 'intro' && (
          <IntroScreen
            onStart={() => setPhase('wonder')}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'wonder' && (
          <WonderPhase
            onComplete={() => setPhase('story')}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'story' && (
          <StoryPhase
            onComplete={() => setPhase('simulate')}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'simulate' && (
          <SimulatePhase
            onComplete={() => setPhase('play')}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'play' && (
          <PlayPhase
            onComplete={(stats) => {
              setPlayStats(stats);
              setPhase('reflect');
            }}
            audioEnabled={audioEnabled}
          />
        )}

        {phase === 'reflect' && (
          <ReflectPhase
            stats={playStats}
            onRestart={restart}
            onGoHome={goHome}
            audioEnabled={audioEnabled}
          />
        )}
      </div>
    </>
  );
}
