import React, { useState, useEffect } from 'react';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';
import Mascot from '../shared/Mascot';

const ROUNDS = [
  { length: 3, width: 2, height: 2 }, // Base: 6, Vol: 12
  { length: 4, width: 3, height: 3 }, // Base: 12, Vol: 36
  { length: 5, width: 4, height: 4 }, // Base: 20, Vol: 80
];

export default function LayerByLayerStation({ onStationFinished }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const config = ROUNDS[roundIdx];
  const baseArea = config.length * config.width;
  const totalVolume = baseArea * config.height;

  const [cells, setCells] = useState(Array(baseArea).fill(false));
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    setCells(Array(baseArea).fill(false));
    setIsStacked(false);
  }, [roundIdx, baseArea]);

  const handleCellClick = (index) => {
    if (!isStacked) {
      const next = [...cells];
      next[index] = !next[index];
      setCells(next);
    }
  };

  const handleFillAll = () => {
    setCells(Array(baseArea).fill(true));
  };

  const filledCount = cells.filter(Boolean).length;
  const isLayerComplete = filledCount === baseArea;

  const handleStack = () => {
    setIsStacked(true);
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
        Station B: Layer by Layer (Round {roundIdx + 1} of {ROUNDS.length})
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Step 1: Fill the <strong>{config.length} × {config.width}</strong> base layer grid. Step 2: Stack it <strong>{config.height}</strong> layers high!
      </p>

      <div style={{ textAlign: 'center', width: '100%' }}>
        {!isStacked ? (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--gold)', marginBottom: '8px' }}>
              Base Layer Grid ({filledCount} / {baseArea} cubes filled)
            </div>

            <div
              className="layer-grid"
              style={{
                gridTemplateColumns: `repeat(${config.length}, 1fr)`,
                maxWidth: `${config.length * 58}px`,
              }}
            >
              {cells.map((filled, i) => (
                <div
                  key={i}
                  className={`layer-cell ${filled ? 'filled' : ''}`}
                  onClick={() => handleCellClick(i)}
                >
                  {filled ? '🧊' : ''}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={handleFillAll}>
                Auto Fill Base
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleStack}
                disabled={!isLayerComplete}
                style={{ opacity: isLayerComplete ? 1 : 0.5 }}
              >
                🧱 Stack {config.height} Layers Up!
              </button>
            </div>
          </>
        ) : (
          <div style={{ animation: 'bounceIn 0.5s ease' }}>
            <CubeVolumeDiagram
              length={config.length}
              width={config.width}
              height={config.height}
              animated
              size="medium"
              showLabel
            />
            <div style={{ margin: '12px 0', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 'bold' }}>
              Base Area ({baseArea}) × Height ({config.height}) = {totalVolume} cubic units!
            </div>
            <Mascot mood="happy" message="Notice how Volume = Base Area × Height!" />
            <button type="button" className="btn btn-primary" onClick={handleNextRound} style={{ marginTop: '12px' }}>
              {roundIdx < ROUNDS.length - 1 ? 'Next Round ➔' : 'Complete Station B 🌟'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
