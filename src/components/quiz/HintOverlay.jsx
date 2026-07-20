import React from 'react';
import CubeVolumeDiagram from '../shared/CubeVolumeDiagram';

export default function HintOverlay({ attemptCount, question, onClose }) {
  if (attemptCount === 0) return null;

  return (
    <div style={{ marginTop: '16px', animation: 'fadeIn 0.3s ease' }}>
      {attemptCount >= 1 && (
        <div className="hint-text">
          💡 <strong>Hint 1:</strong> {question.hint1}
        </div>
      )}

      {attemptCount >= 2 && (
        <div style={{ marginTop: '12px' }}>
          <div className="hint-text" style={{ color: 'var(--cyan-bright)' }}>
            🧱 <strong>Hint 2:</strong> {question.hint2}
          </div>
          <CubeVolumeDiagram
            length={question.length}
            width={question.width}
            height={question.height}
            animated
            size="small"
            showLabel={false}
          />
        </div>
      )}

      {attemptCount >= 3 && (
        <div className="glass-card" style={{ marginTop: '12px', padding: '16px', border: '1px solid var(--green)' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--green-light)' }}>
            ✅ Solution Explanation:
          </div>
          <p style={{ fontSize: '0.95rem', margin: '6px 0' }}>{question.explanation}</p>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose} style={{ marginTop: '8px' }}>
            Got It ➔
          </button>
        </div>
      )}
    </div>
  );
}
