import React, { useState, useEffect } from 'react';
import STORY_PANELS from '../../data/storyContent';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';
import Mascot from '../shared/Mascot';
import { narrate, stopNarration } from '../../utils/audio';
import { getStoryNarration } from '../../utils/narration';

export default function StoryPhase({ onComplete, audioEnabled }) {
  const [panelIndex, setPanelIndex] = useState(0);

  const panel = STORY_PANELS[panelIndex];

  useEffect(() => {
    if (audioEnabled) {
      narrate(getStoryNarration(panelIndex));
    }
    return () => stopNarration();
  }, [panelIndex, audioEnabled]);

  const handleNext = () => {
    stopNarration();
    if (panelIndex < STORY_PANELS.length - 1) {
      setPanelIndex(panelIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    stopNarration();
    if (panelIndex > 0) {
      setPanelIndex(panelIndex - 1);
    }
  };

  return (
    <div className="story-phase">
      <div className="story-progress">
        <div className="story-progress-bar">
          <div
            className="story-progress-fill"
            style={{ width: `${((panelIndex + 1) / STORY_PANELS.length) * 100}%` }}
          />
        </div>
        <div className="story-progress-label">
          Panel {panelIndex + 1} of {STORY_PANELS.length}
        </div>
      </div>

      <div className="story-card glass-card">
        <div className="card-top-image-container">
          <img
            src={`/assets/images/story_${panelIndex + 1}.png`}
            alt={panel.title}
            className="card-top-image"
          />
          <div className="card-top-image-overlay">
            <CubeVolumeDiagram
              length={panel.dimensions.length}
              width={panel.dimensions.width}
              height={panel.dimensions.height}
              missingSlot={panel.missingSlot}
              animated
              size="medium"
              showLabel
            />
          </div>
        </div>

        <div className="story-text-section">
          <h2 className="story-title">{panel.title}</h2>
          <p className="story-text">{panel.text}</p>

          {panel.highlight && (
            <div className="story-highlight">
              <span className="story-highlight-text">{panel.highlight}</span>
            </div>
          )}

          <Mascot mood="happy" message="Notice how volume is base area multiplied by height!" />
        </div>
      </div>

      <div className="story-nav">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handlePrev}
          disabled={panelIndex === 0}
          style={{ opacity: panelIndex === 0 ? 0.4 : 1 }}
        >
          ⬅ Previous
        </button>

        <div className="progress-dots">
          {STORY_PANELS.map((_, idx) => (
            <div
              key={idx}
              className={`progress-dot ${idx === panelIndex ? 'active' : idx < panelIndex ? 'completed' : ''}`}
            />
          ))}
        </div>

        <button type="button" className="btn btn-primary btn-sm" onClick={handleNext}>
          {panelIndex < STORY_PANELS.length - 1 ? 'Next Panel ➔' : 'Complete Story 🧪'}
        </button>
      </div>
    </div>
  );
}
