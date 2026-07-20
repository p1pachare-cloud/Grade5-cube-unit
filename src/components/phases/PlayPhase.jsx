import React, { useState, useEffect } from 'react';
import WorldMap from '../gamification/WorldMap';
import QuestionRenderer from '../quiz/QuestionRenderer';
import HintOverlay from '../quiz/HintOverlay';
import FeedbackOverlay from '../shared/FeedbackOverlay';
import Mascot from '../shared/Mascot';
import { generateAllQuestions } from '../../utils/questionGenerator';
import { calcXP } from '../../utils/scoring';
import { narrate, stopNarration } from '../../utils/audio';
import { correctFeedbackNarration, incorrectFeedbackNarration } from '../../utils/narration';

export default function PlayPhase({ onComplete, audioEnabled }) {
  const [questions] = useState(() => generateAllQuestions());
  const [selectedWorld, setSelectedWorld] = useState(null); // null = map view
  const [questionIdxInWorld, setQuestionIdxInWorld] = useState(0); // 0–9

  const [worldScores, setWorldScores] = useState(Array(10).fill(null));
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect, message }

  const currentQIdx = selectedWorld !== null ? selectedWorld * 10 + questionIdxInWorld : 0;
  const currentQ = questions[currentQIdx];

  useEffect(() => {
    if (selectedWorld !== null && currentQ && audioEnabled) {
      narrate([
        { text: currentQ.questionText, style: 'question' }
      ]);
    }
    return () => stopNarration();
  }, [selectedWorld, questionIdxInWorld, audioEnabled, currentQ]);

  const handleSelectWorld = (worldIdx) => {
    setSelectedWorld(worldIdx);
    setQuestionIdxInWorld(0);
    setAttemptCount(0);
    setSelectedOption(null);
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    stopNarration();
    const isCorrect = String(selectedOption) === String(currentQ.correctAnswer);

    if (isCorrect) {
      const earnedXP = calcXP(attemptCount + 1, 0, streak);
      setXp((prev) => prev + earnedXP);
      setStreak((prev) => prev + 1);

      if (audioEnabled) narrate(correctFeedbackNarration());

      setFeedback({
        isCorrect: true,
        message: `Correct! +${earnedXP} XP`,
      });

      // Increment world score
      const newScores = [...worldScores];
      newScores[selectedWorld] = (newScores[selectedWorld] || 0) + 1;
      setWorldScores(newScores);

    } else {
      setStreak(0);
      setAttemptCount((prev) => prev + 1);

      if (audioEnabled) narrate(incorrectFeedbackNarration());

      setFeedback({
        isCorrect: false,
        message: 'Not quite right! Check the hint.',
      });
    }
  };

  const handleCloseFeedback = () => {
    const wasCorrect = feedback?.isCorrect;
    setFeedback(null);
    setSelectedOption(null);

    if (wasCorrect) {
      setAttemptCount(0);
      if (questionIdxInWorld < 9) {
        setQuestionIdxInWorld(questionIdxInWorld + 1);
      } else {
        // Completed World
        setSelectedWorld(null);
      }
    }
  };

  if (selectedWorld === null) {
    return (
      <div className="play-phase">
        <div className="hud">
          <div className="hud-item" style={{ color: 'var(--gold)' }}>
            ✨ XP: {xp}
          </div>
          <div className="hud-item streak-fire">
            🔥 Streak: {streak}
          </div>
        </div>

        <WorldMap
          worldScores={worldScores}
          currentWorld={selectedWorld}
          onSelectWorld={handleSelectWorld}
        />

        <button
          type="button"
          className="btn btn-green btn-lg"
          style={{ marginTop: '24px' }}
          onClick={() => onComplete({ xp, worldScores, streak })}
        >
          Finish Play Phase & Reflect 📓
        </button>
      </div>
    );
  }

  return (
    <div className="play-phase">
      <div className="hud">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelectedWorld(null)}>
          🗺️ World Map
        </button>
        <div className="hud-item" style={{ color: 'var(--gold)' }}>
          ✨ XP: {xp}
        </div>
        <div className="hud-item streak-fire">
          🔥 Streak: {streak}
        </div>
      </div>

      <div style={{ color: 'var(--gold)', fontWeight: 'bold', margin: '4px 0 8px' }}>
        World {selectedWorld + 1} — Question {questionIdxInWorld + 1} of 10
      </div>

      <div className="question-card glass-card" style={{ width: '100%', maxWidth: '680px', padding: '18px 24px' }}>
        <QuestionRenderer
          question={currentQ}
          selectedOption={selectedOption}
          onSelectOption={handleOptionClick}
          disabled={feedback !== null}
        />

        <div style={{ marginTop: '12px', textAlign: 'center', width: '100%' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null || selectedOption === undefined}
            style={{
              opacity: selectedOption !== null && selectedOption !== undefined ? 1 : 0.4,
              cursor: selectedOption !== null && selectedOption !== undefined ? 'pointer' : 'not-allowed',
              padding: '10px 28px',
              fontSize: '1.05rem',
              boxShadow: selectedOption !== null && selectedOption !== undefined ? '0 0 20px rgba(255, 193, 7, 0.5)' : 'none',
              transform: selectedOption !== null && selectedOption !== undefined ? 'scale(1.03)' : 'none',
              transition: 'all 0.3s ease',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            {selectedOption !== null && selectedOption !== undefined ? 'Submit Answer ➔' : 'Select an Option Above'}
          </button>
        </div>

        <HintOverlay
          attemptCount={attemptCount}
          question={currentQ}
          onClose={() => setAttemptCount(0)}
        />
      </div>

      <FeedbackOverlay
        isCorrect={feedback?.isCorrect ?? null}
        message={feedback?.message}
        onClose={handleCloseFeedback}
      />
    </div>
  );
}
