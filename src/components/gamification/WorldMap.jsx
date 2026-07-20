import React from 'react';
import { WORLDS } from '../../data/questionBank';

const WORLD_ICONS = ['📦', '🏰', '🐠', '🎁', '🏖️', '🏪', '🧱', '🏙️', '🚢', '🏛️'];

export default function WorldMap({ worldScores = [], currentWorld, onSelectWorld }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '16px' }}>
        🗺️ IntelliPlay™ 10-World Map
      </h2>

      <div className="world-map">
        {WORLDS.map((w, idx) => {
          const score = worldScores[idx];
          const isUnlocked = idx === 0 || (worldScores[idx - 1] !== null && worldScores[idx - 1] >= 6);
          const isCompleted = score !== null && score !== undefined;
          const stars = score >= 9 ? '⭐⭐⭐' : score >= 6 ? '⭐⭐' : score >= 4 ? '⭐' : '☆☆☆';

          return (
            <div
              key={w.id}
              className={`world-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`}
              onClick={() => isUnlocked && onSelectWorld(idx)}
            >
              <div style={{ fontSize: '2.5rem' }}>{WORLD_ICONS[idx]}</div>
              <div className="world-name">{w.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>World {idx + 1}</div>

              {isUnlocked ? (
                <div style={{ marginTop: '4px', fontSize: '1rem', color: 'var(--gold)' }}>
                  {isCompleted ? `${stars} (${score}/10)` : 'Unlocked ➔'}
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔒 Complete World {idx}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
