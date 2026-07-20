import React from 'react';

export default function FeedbackOverlay({ isCorrect, message, subtext, onClose }) {
  if (isCorrect === null) return null;

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className={`feedback-content ${isCorrect ? 'correct' : 'wrong'}`} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
          {isCorrect ? '🎉' : '💡'}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
          {message || (isCorrect ? 'Awesome job!' : 'Not quite!')}
        </div>
        {subtext && <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '20px' }}>{subtext}</p>}
        <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
          Continue ➔
        </button>
      </div>
    </div>
  );
}
