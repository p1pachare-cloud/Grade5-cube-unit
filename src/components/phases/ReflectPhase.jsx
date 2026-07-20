import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Mascot from '../shared/Mascot';
import { BADGES, checkBadges } from '../../utils/badgeEngine';
import { narrate, stopNarration } from '../../utils/audio';
import { reflectNarration } from '../../utils/narration';

export default function ReflectPhase({ stats, onRestart, onGoHome, audioEnabled }) {
  const [reflectionText, setReflectionText] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (audioEnabled) {
      narrate(reflectNarration());
    }
    return () => stopNarration();
  }, [audioEnabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const xp = stats?.xp || 0;
  const totalCorrect = (stats?.worldScores || []).reduce((a, b) => a + (b || 0), 0);
  const unlockedBadges = checkBadges({
    phaseComplete: { wonder: true, story: true, simulate: true, play: true, reflect: true },
    simStationsComplete: [true, true, true],
    streak: stats?.streak || 0,
    worldScores: stats?.worldScores || [],
  });

  return (
    <div className="reflect-phase">
      {!isSubmitted ? (
        <div className="glass-card" style={{ maxWidth: '640px', width: '100%', padding: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', marginBottom: '8px' }}>
            📓 Reflect & Journal
          </h2>

          <Mascot mood="thinking" message="What a journey today! Can you describe how you would find the volume of your own school bag?" />

          <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', marginBottom: '8px', color: 'var(--gold)' }}>
                Your Reflection Journal:
              </label>
              <textarea
                rows={4}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  padding: '12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                }}
                placeholder="I would measure the length, width, and height of my school bag in centimetres, then multiply length × width × height..."
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', marginBottom: '8px', color: 'var(--gold)', textAlign: 'center' }}>
                How confident do you feel about measuring 3D volume?
              </label>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['🌟 Feeling Masterful', '👍 Getting There', '💪 Need More Practice'].map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`btn btn-outline btn-sm ${confidence === idx ? 'selected' : ''}`}
                    style={{ borderColor: confidence === idx ? 'var(--gold)' : undefined }}
                    onClick={() => setConfidence(idx)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <button type="submit" className="btn btn-primary btn-lg">
                Submit Reflection & View Certificate 📜
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="certificate-card" style={{ padding: '32px' }}>
          <div className="cert-badge">🏆</div>
          <h2 className="cert-title">Certificate of Achievement</h2>
            <p style={{ color: 'var(--text-secondary)' }}>This certifies that the learner has mastered</p>
            <h3 style={{ color: 'var(--gold)', margin: '8px 0' }}>Grade 5: Cubic Units & 3D Volume</h3>

            <div className="cert-stats">
              <div className="cert-stat">
                <div className="cert-stat-value" style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 'bold' }}>{xp}</div>
                <div className="cert-stat-label">Total XP</div>
              </div>
              <div className="cert-stat">
                <div className="cert-stat-value" style={{ color: 'var(--green-light)', fontSize: '1.4rem', fontWeight: 'bold' }}>{totalCorrect}</div>
                <div className="cert-stat-label">Questions Solved</div>
              </div>
              <div className="cert-stat">
                <div className="cert-stat-value" style={{ color: 'var(--cyan-bright)', fontSize: '1.4rem', fontWeight: 'bold' }}>{unlockedBadges.length}</div>
                <div className="cert-stat-label">Badges Unlocked</div>
              </div>
            </div>

            <div style={{ textAlign: 'left', margin: '16px 0' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 'bold', marginBottom: '8px' }}>
                Unlocked Badges:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {BADGES.filter((b) => unlockedBadges.includes(b.id)).map((b) => (
                  <div key={b.id} style={{ background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}>
                    {b.icon} {b.title}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
              <button type="button" className="btn btn-outline" onClick={onRestart}>
                🔄 Replay Lesson
              </button>
              <button type="button" className="btn btn-primary" onClick={onGoHome}>
                🏠 Back to Course
              </button>
            </div>
        </div>
      )}
    </div>
  );
}
