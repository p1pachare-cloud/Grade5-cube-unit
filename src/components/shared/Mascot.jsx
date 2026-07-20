import React from 'react';

const MOOD_EMOJIS = {
  idle: '🤖',
  curious: '🧐',
  happy: '🎉',
  thinking: '🤔',
  celebrate: '🌟',
  encouraging: '💪',
};

export default function Mascot({ mood = 'idle', message, className = '' }) {
  const emoji = MOOD_EMOJIS[mood] || MOOD_EMOJIS.idle;

  return (
    <div className={`mascot-container ${className}`}>
      <div className={`mascot ${mood}`} title={`LearnFlow Robot (${mood})`}>
        <span>{emoji}</span>
      </div>
      {message && (
        <div className="speech-bubble">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
