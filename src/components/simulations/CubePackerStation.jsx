import React, { useState, useEffect } from 'react';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';
import Mascot from '../shared/Mascot';

const ROUNDS = [
  { length: 2, width: 2, height: 2 }, // 8
  { length: 4, width: 3, height: 2 }, // 24
  { length: 5, width: 2, height: 3 }, // 30
  { length: 4, width: 4, height: 3 }, // 48
];

export default function CubePackerStation({ onCompleteRound, onStationFinished }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const config = ROUNDS[roundIdx];
  const targetCubes = config.length * config.width * config.height;

  const [placedCount, setPlacedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setPlacedCount(0);
    setIsDone(false);
  }, [roundIdx]);

  const handleAddCube = () => {
    if (placedCount < targetCubes) {
      const next = placedCount + 1;
      setPlacedCount(next);
      if (next === targetCubes) {
        setIsDone(true);
      }
    }
  };

  const handleNextRound = () => {
    if (roundIdx < ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
    } else {
      onStationFinished();
    }
  };

  return (
    <div className="cube-packer-area">
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: '4px' }}>
        Station A: The Cube Packer (Round {roundIdx + 1} of {ROUNDS.length})
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Pack the box: <strong>{config.length} long × {config.width} wide × {config.height} tall</strong>
      </p>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <div onClick={handleAddCube} style={{ cursor: 'pointer', display: 'inline-block' }} title="Click box to pack cube">
          <CubeVolumeDiagram
            length={config.length}
            width={config.width}
            height={config.height}
            placedCubes={placedCount}
            size="medium"
            showLabel={isDone}
          />
        </div>

        <div style={{ margin: '12px 0', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gold)' }}>
          Cubes Placed: {placedCount} / {targetCubes}
        </div>

        {!isDone ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddCube}
              >
                ➕ Pack 1 Cube 🧊
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setPlacedCount(targetCubes);
                  setIsDone(true);
                }}
              >
                ⚡ Pack All Cubes
              </button>
            </div>

            <div className="cube-tray" onClick={handleAddCube} style={{ cursor: 'pointer' }}>
              {Array.from({ length: Math.min(8, targetCubes - placedCount) }).map((_, i) => (
                <div key={i} className="unit-cube-item" title="Click to pack cube">
                  🧊
                </div>
              ))}
              <div style={{ width: '100%', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Tap the 3D box or any cube above to pack it into the box!
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '12px', animation: 'bounceIn 0.5s ease' }}>
            <Mascot mood="happy" message={`Perfect! Volume = ${config.length} × ${config.width} × ${config.height} = ${targetCubes} cubic units!`} />
            <button type="button" className="btn btn-primary" onClick={handleNextRound} style={{ marginTop: '12px' }}>
              {roundIdx < ROUNDS.length - 1 ? 'Next Round ➔' : 'Complete Station A 🌟'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
