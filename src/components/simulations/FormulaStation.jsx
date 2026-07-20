import React, { useState, useEffect } from 'react';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';
import NumberPad from '../shared/NumberPad';
import Mascot from '../shared/Mascot';

const PROBLEMS = [
  { length: 5, width: 3, height: 2, missing: 'volume', target: 30 },
  { length: 4, width: 3, height: 4, missing: 'width', target: 3 }, // 4 x ? x 4 = 48
  { length: 6, width: 2, height: 3, missing: 'volume', target: 36 },
];

export default function FormulaStation({ onStationFinished }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const prob = PROBLEMS[roundIdx];

  const [inputVal, setInputVal] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setInputVal('');
    setShowBox(false);
    setIsCorrect(false);
  }, [roundIdx]);

  const handleSubmit = () => {
    if (Number(inputVal) === prob.target) {
      setIsCorrect(true);
    } else {
      alert("Not quite right! Check your multiplication or tap 'Show 3D Box' for help.");
    }
  };

  const handleNextRound = () => {
    if (roundIdx < PROBLEMS.length - 1) {
      setRoundIdx(roundIdx + 1);
    } else {
      onStationFinished();
    }
  };

  return (
    <div className="cube-packer-area">
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: '4px' }}>
        Station C: Build the Formula (Round {roundIdx + 1} of {PROBLEMS.length})
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Fill in the blank value in the Volume formula:
      </p>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <div className="formula-row">
          <span>Volume = </span>
          <span>{prob.length}</span>
          <span style={{ color: 'var(--gold)' }}> × </span>

          {prob.missing === 'width' ? (
            <div className={`blank-input ${inputVal ? 'filled' : ''}`}>
              {inputVal || '?'}
            </div>
          ) : (
            <span>{prob.width}</span>
          )}

          <span style={{ color: 'var(--gold)' }}> × </span>
          <span>{prob.height}</span>
          <span style={{ color: 'var(--gold)' }}> = </span>

          {prob.missing === 'volume' ? (
            <div className={`blank-input ${inputVal ? 'filled' : ''}`}>
              {inputVal || '?'}
            </div>
          ) : (
            <span>{prob.target}</span>
          )}
        </div>

        {!isCorrect ? (
          <>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setShowBox(!showBox)}
              style={{ marginBottom: '12px' }}
            >
              📦 {showBox ? 'Hide 3D Box Scaffold' : 'Show 3D Box Scaffold'}
            </button>

            {showBox && (
              <CubeVolumeDiagram
                length={prob.length}
                width={prob.width}
                height={prob.height}
                missingSlot={prob.missing}
                size="medium"
              />
            )}

            <NumberPad
              value={inputVal}
              onChange={setInputVal}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <div style={{ marginTop: '16px', animation: 'bounceIn 0.5s ease' }}>
            <Mascot mood="happy" message={`Awesome! Formula: ${prob.length} × ${prob.width} × ${prob.height} = ${prob.target} cubic units!`} />
            <button type="button" className="btn btn-primary" onClick={handleNextRound} style={{ marginTop: '12px' }}>
              {roundIdx < PROBLEMS.length - 1 ? 'Next Round ➔' : 'Complete Station C 🌟'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
