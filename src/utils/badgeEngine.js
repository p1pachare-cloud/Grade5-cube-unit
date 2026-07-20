export const BADGES = [
  { id: 'cube_curious', icon: '🏅', title: 'Cube Curious', desc: 'Complete Wonder + Story phases' },
  { id: 'box_builder', icon: '🥈', title: 'Box Builder', desc: 'Complete all 3 Simulation stations' },
  { id: 'volume_master', icon: '🥇', title: 'Volume Master', desc: 'Score ≥80% in Play phase' },
  { id: 'perfect_packer', icon: '💎', title: 'Perfect Packer', desc: 'Score 10/10 in any world' },
  { id: 'streak_star', icon: '🔥', title: 'Streak Star', desc: 'Achieve a streak of 10 consecutive correct answers' },
  { id: 'full_journey', icon: '🌟', title: 'Full Journey', desc: 'Complete all 6 phases' },
  { id: 'sharp_stacker', icon: '🎯', title: 'Sharp Stacker', desc: 'Answer 5 composite solid questions correctly' },
  { id: 'global_explorer', icon: '🌍', title: 'Global Explorer', desc: 'Solve word problems from 5 different countries' },
];

export function checkBadges(gameState) {
  const unlocked = new Set(gameState.badges || []);

  if (gameState.phaseComplete?.wonder && gameState.phaseComplete?.story) {
    unlocked.add('cube_curious');
  }
  if (gameState.simStationsComplete?.every(Boolean)) {
    unlocked.add('box_builder');
  }
  if (gameState.streak >= 10) {
    unlocked.add('streak_star');
  }
  if (gameState.compositeSolidStreak >= 5) {
    unlocked.add('sharp_stacker');
  }
  if ((gameState.countriesSeen || []).length >= 5) {
    unlocked.add('global_explorer');
  }
  if (gameState.worldScores?.some(s => s === 10)) {
    unlocked.add('perfect_packer');
  }
  const totalCorrect = (gameState.worldScores || []).reduce((a, b) => a + (b || 0), 0);
  if (totalCorrect >= 80) {
    unlocked.add('volume_master');
  }
  if (Object.values(gameState.phaseComplete || {}).every(Boolean)) {
    unlocked.add('full_journey');
  }

  return Array.from(unlocked);
}
