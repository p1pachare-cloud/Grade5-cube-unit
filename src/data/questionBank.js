export const QUESTION_TYPES = [
  'count_cubes',          // Q1
  'picture_volume',       // Q2
  'fill_volume',          // Q3
  'fill_dimension',       // Q4
  'base_area_method',     // Q5
  'word_problem_volume',  // Q6
  'word_problem_compare', // Q7
  'true_false_volume',    // Q8
  'composite_solid',      // Q9
  'unit_conversion',      // Q10
];

export const WORLDS = [
  { id: 0, name: "Toy Box Town", theme: "easy", diff: 1 },
  { id: 1, name: "Crate Kingdom", theme: "easy-med", diff: 1 },
  { id: 2, name: "Aquarium Alley", theme: "medium", diff: 2 },
  { id: 3, name: "Gift Box Grove", theme: "medium", diff: 2 },
  { id: 4, name: "Sandbox Summit", theme: "med-hard", diff: 2 },
  { id: 5, name: "Storage Station", theme: "hard", diff: 3 },
  { id: 6, name: "Brick Bay", theme: "hard", diff: 3 },
  { id: 7, name: "Tower Terrace", theme: "hard", diff: 3 },
  { id: 8, name: "Global Cargo Port", theme: "hard", diff: 3 },
  { id: 9, name: "Volume Vault", theme: "hardest", diff: 3 },
];

export const TEMPLATES = [];

// Generate 10 templates per question type (100 total)
QUESTION_TYPES.forEach((type, typeIdx) => {
  for (let i = 0; i < 10; i++) {
    const worldIndex = i; // Map to 10 worlds
    const difficulty = worldIndex < 2 ? 1 : worldIndex < 5 ? 2 : 3;

    TEMPLATES.push({
      templateId: `${type}_template_${i}`,
      type,
      world: worldIndex,
      difficulty,
      missingSlot: type === 'fill_dimension' ? 'width' : 'volume',
      visual: type === 'count_cubes' || type === 'composite_solid' || type === 'picture_volume'
        ? 'cubeDiagram'
        : type === 'true_false_volume'
        ? 'trueFalse'
        : 'formula',
    });
  }
});

export default TEMPLATES;
