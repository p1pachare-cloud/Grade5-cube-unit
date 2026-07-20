import TEMPLATES from '../data/questionBank';
import { generateDistractors } from './scoring';

const NAMES = [
  "John", "Mike", "Sarah", "Emma", "Liam", "Sofia", "Yuki", "Carlos",
  "Amara", "Noah", "Priya", "Lucas", "Fatima", "Oliver", "Mei", "Ahmed",
  "Grace", "Diego", "Hana", "Ethan"
];

const OBJECTS = [
  "toy box", "shipping crate", "fish tank", "gift box", "sandbox",
  "storage bin", "brick pile", "ice cube tray", "aquarium", "moving box"
];

const COUNTRIES = ["USA", "Brazil", "Japan", "India", "UK", "Australia", "Singapore", "Kenya", "Mexico", "Egypt"];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function instantiateQuestion(template, index) {
  const diff = template.difficulty;
  const minDim = diff === 1 ? 1 : diff === 2 ? 2 : 3;
  const maxDim = diff === 1 ? 4 : diff === 2 ? 6 : 8;

  const length = randInt(minDim, maxDim);
  const width = randInt(minDim, maxDim);
  const height = randInt(minDim, maxDim);
  const volume = length * width * height;
  const baseArea = length * width;

  const name1 = NAMES[index % NAMES.length];
  const name2 = NAMES[(index + 3) % NAMES.length];
  const obj1 = OBJECTS[index % OBJECTS.length];
  const obj2 = OBJECTS[(index + 2) % OBJECTS.length];
  const country = COUNTRIES[index % COUNTRIES.length];

  let qText = "";
  let correctAnswer = volume;
  let options = [];
  let isTrue = true;

  switch (template.type) {
    case 'count_cubes':
      qText = `A box is packed with unit cubes: ${length} long, ${width} wide, and ${height} tall. What is its volume?`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
      break;

    case 'picture_volume':
      qText = `What is the volume of this 3D rectangular prism (${length} × ${width} × ${height})?`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
      break;

    case 'fill_volume':
      qText = `Fill in the blank: Volume = ${length} × ${width} × ${height} = ___ cubic units.`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
      break;

    case 'fill_dimension':
      qText = `Find the missing dimension: ${length} × ___ × ${height} = ${volume} cubic units.`;
      correctAnswer = width;
      options = generateDistractors(width, 1, 20);
      break;

    case 'base_area_method':
      qText = `A prism has a base area of ${baseArea} cm² and a height of ${height} cm. Find its volume.`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
      break;

    case 'word_problem_volume':
      qText = `${name1} in ${country} is packing a ${obj1} that is ${length} cm long, ${width} cm wide, and ${height} cm tall. What is its volume?`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
      break;

    case 'word_problem_compare': {
      const l2 = randInt(minDim, maxDim);
      const w2 = randInt(minDim, maxDim);
      const h2 = randInt(minDim, maxDim);
      const v2 = l2 * w2 * h2;
      qText = `${name1}'s ${obj1} is ${length}×${width}×${height}. ${name2}'s ${obj2} is ${l2}×${w2}×${h2}. Which container has the greater volume?`;
      correctAnswer = volume > v2 ? `${name1}'s ${obj1}` : volume < v2 ? `${name2}'s ${obj2}` : "Both are equal";
      options = [`${name1}'s ${obj1}`, `${name2}'s ${obj2}`, "Both are equal", "Cannot be determined"];
      break;
    }

    case 'true_false_volume':
      isTrue = (index % 2 === 0);
      const displayedVolume = isTrue ? volume : volume + 6;
      qText = `True or False: A prism ${length} cm long, ${width} cm wide, and ${height} cm tall has a volume of ${displayedVolume} cubic units.`;
      correctAnswer = isTrue ? "True" : "False";
      options = ["True", "False"];
      break;

    case 'composite_solid': {
      const l2 = 2; const w2 = 2; const h2 = 2;
      const v2 = 8;
      const totalV = volume + v2;
      qText = `${name1} stacked a 2×2×2 block on top of a ${length}×${width}×${height} box. What is the total volume of the composite shape?`;
      correctAnswer = totalV;
      options = generateDistractors(totalV, 1, 500);
      break;
    }

    case 'unit_conversion':
      qText = `A box packed with ${volume} unit cubes (each 1 cm × 1 cm × 1 cm) has a volume of ${volume} cubic centimetres. How is this written in units?`;
      correctAnswer = `${volume} cm³`;
      options = [`${volume} cm³`, `${volume} cm²`, `${volume} cm`, `${volume} m`].sort();
      break;

    default:
      qText = `Calculate volume for ${length} × ${width} × ${height}.`;
      correctAnswer = volume;
      options = generateDistractors(volume, 1, 500);
  }

  return {
    id: `Q_${template.type}_${index}`,
    ...template,
    length,
    width,
    height,
    volume,
    baseArea,
    questionText: qText,
    correctAnswer,
    options,
    characterName: name1,
    objectName: obj1,
    countryContext: country,
    hint1: `Remember: Volume = length × width × height. Multiply ${length} × ${width} = ${baseArea} first!`,
    hint2: `Now multiply ${baseArea} by height ${height}: ${baseArea} × ${height} = ${volume}!`,
    explanation: `${length} × ${width} × ${height} = ${volume}. The volume is ${correctAnswer}.`,
  };
}

export function generateAllQuestions() {
  return TEMPLATES.map((t, idx) => instantiateQuestion(t, idx));
}
