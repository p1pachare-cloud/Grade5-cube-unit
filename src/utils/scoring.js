export function calcXP(attemptCount, hintsUsed = 0, streak = 0) {
  let base = 10;
  if (attemptCount === 2) base = 7;
  if (attemptCount >= 3 || hintsUsed > 0) base = 5;

  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export function calcStars(score, total = 10) {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return 3;
  if (percentage >= 60) return 2;
  if (percentage >= 40) return 1;
  return 0;
}

export function generateDistractors(correctAnswer, min = 1, max = 500) {
  const answer = Number(correctAnswer);
  if (isNaN(answer)) {
    return [correctAnswer, "Option A", "Option B", "Option C"];
  }

  const set = new Set([answer]);
  const offsets = [-10, +10, -5, +5, -2, +2, -1, +1, -12, +12, -15, +15];

  for (const offset of offsets) {
    if (set.size >= 4) break;
    const candidate = answer + offset;
    if (candidate >= min && candidate !== answer) {
      set.add(candidate);
    }
  }

  while (set.size < 4) {
    const candidate = Math.floor(Math.random() * 20) + 1;
    set.add(candidate * 4);
  }

  const arr = Array.from(set);
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
