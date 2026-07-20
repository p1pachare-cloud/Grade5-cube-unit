import React, { useState, useEffect } from 'react';
import CubePackerStation from '../simulations/CubePackerStation';
import LayerByLayerStation from '../simulations/LayerByLayerStation';
import FormulaStation from '../simulations/FormulaStation';
import { narrate, stopNarration } from '../../utils/audio';
import { simulateStationAIntro, simulateStationBIntro, simulateStationCIntro } from '../../utils/narration';

export default function SimulatePhase({ onComplete, audioEnabled }) {
  const [stationIdx, setStationIdx] = useState(0);
  const [completedStations, setCompletedStations] = useState([false, false, false]);

  useEffect(() => {
    if (audioEnabled) {
      if (stationIdx === 0) narrate(simulateStationAIntro());
      if (stationIdx === 1) narrate(simulateStationBIntro());
      if (stationIdx === 2) narrate(simulateStationCIntro());
    }
    return () => stopNarration();
  }, [stationIdx, audioEnabled]);

  const handleStationFinished = (idx) => {
    stopNarration();
    const next = [...completedStations];
    next[idx] = true;
    setCompletedStations(next);

    if (idx < 2) {
      setStationIdx(idx + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="simulate-phase">
      <div className="station-nav">
        {['Station A: Cube Packer 🧊', 'Station B: Layer by Layer 🧱', 'Station C: Build Formula 📐'].map((label, idx) => (
          <button
            key={idx}
            type="button"
            className={`station-tab ${stationIdx === idx ? 'active' : ''} ${completedStations[idx] ? 'completed' : ''}`}
            onClick={() => {
              stopNarration();
              setStationIdx(idx);
            }}
          >
            {completedStations[idx] ? '✓ ' : ''}{label}
          </button>
        ))}
      </div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '720px', padding: '28px' }}>
        {stationIdx === 0 && (
          <CubePackerStation
            onStationFinished={() => handleStationFinished(0)}
          />
        )}

        {stationIdx === 1 && (
          <LayerByLayerStation
            onStationFinished={() => handleStationFinished(1)}
          />
        )}

        {stationIdx === 2 && (
          <FormulaStation
            onStationFinished={() => handleStationFinished(2)}
          />
        )}
      </div>
    </div>
  );
}
