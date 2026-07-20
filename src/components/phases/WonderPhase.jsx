import React, { useEffect, useState } from 'react';
import Mascot from '../shared/Mascot';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';
import { narrate, stopNarration } from '../../utils/audio';
import { wonderNarration } from '../../utils/narration';

export default function WonderPhase({ onComplete, audioEnabled }) {
  const [cubesFilling, setCubesFilling] = useState(1);

  useEffect(() => {
    if (audioEnabled) {
      narrate(wonderNarration());
    }

    const interval = setInterval(() => {
      setCubesFilling((prev) => (prev >= 2 ? 1 : prev + 1));
    }, 1500);

    return () => {
      stopNarration();
      clearInterval(interval);
    };
  }, [audioEnabled]);

  return (
    <div className="wonder-phase">
      <div className="wonder-content">
        <div className="wonder-question-card glass-card">
          <div className="card-top-image-container">
            <img src="/assets/images/wonder_banner.png" alt="Sarah Packing Toy Box" className="card-top-image" />
            <div className="card-top-image-overlay">
              <CubeVolumeDiagram
                length={4}
                width={3}
                height={cubesFilling}
                animated
                size="medium"
                showLabel={false}
              />
            </div>
          </div>

          <div className="card-body-content">
            <h2 className="wonder-question-text">
              Sarah is packing a toy box 📦. It's 4 cubes long, 3 cubes wide, and 2 cubes tall.
            </h2>

            <p className="wonder-subtext" style={{ marginBottom: '16px' }}>
              Let's discover what VOLUME really means by packing it layer by layer!
            </p>

            <Mascot mood="curious" message="How many little unit cubes can fit inside altogether?" />

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => {
                  stopNarration();
                  onComplete();
                }}
              >
                🔍 Discover Volume ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
