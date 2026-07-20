import React, { useEffect } from 'react';
import { narrate, stopNarration } from '../utils/audio';

const JOURNEY_STEPS = [
  { icon: '🔍', title: 'Wonder', desc: 'Discover 3D Space' },
  { icon: '📖', title: 'Story', desc: 'World Crate Adventure' },
  { icon: '🧪', title: 'Simulate', desc: 'Pack & Build Cubes' },
  { icon: '🎮', title: 'Play', desc: '10-World Volume Arena' },
  { icon: '📓', title: 'Reflect', desc: 'Journal & Badge Award' },
];

export default function IntroScreen({ onStart, audioEnabled }) {
  useEffect(() => {
    if (audioEnabled) {
      narrate([
        { text: "Hello, Explorer! Today we're measuring VOLUME with cubic units!", style: 'encouragement' }
      ]);
    }
    return () => stopNarration();
  }, [audioEnabled]);

  return (
    <div className="intro-screen">
      <div className="intro-badge">
        Grade 5 Mathematics
      </div>

      <h1 className="intro-title">
        Cubic Units — Measuring Volume
      </h1>

      <p className="intro-desc">
        Step into the 3D spatial world of volume! Pack unit cubes into shipping crates, build layer-by-layer formulas, and conquer 10 gamified practice worlds.
      </p>

      <div className="intro-journey-map">
        <div className="intro-journey-title">6-Stage Learner Journey</div>
        <div className="intro-journey-steps">
          {JOURNEY_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="intro-journey-step">
                <div className="intro-journey-icon">{step.icon}</div>
                <div className="intro-journey-info">
                  <div className="intro-journey-label">{step.title}</div>
                  <div className="intro-journey-desc">{step.desc}</div>
                </div>
              </div>
              {idx < JOURNEY_STEPS.length - 1 && (
                <div className="intro-journey-arrow">➔</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg intro-start-btn"
        onClick={() => {
          stopNarration();
          onStart();
        }}
      >
        🚀 Begin Expedition
      </button>
    </div>
  );
}
