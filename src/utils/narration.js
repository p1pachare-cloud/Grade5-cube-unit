import { say, ask, cheer, emphasize, think, celebrate, instruct } from './audio';

export function wonderNarration() {
  return [
    think("Sarah is packing a toy box. It's four cubes long, three cubes wide, and two cubes tall."),
    ask("How many little cube blocks can fit inside altogether?"),
    cheer("Let's discover what volume really means!")
  ];
}

export function getStoryNarration(panelIndex) {
  const scripts = [
    [say("John and his friend Mike are building a model shipping crate for the school science fair.")],
    [say("The crate is five cubes long, three cubes wide, and two cubes high. Let's fill it with unit cubes and count them!")],
    [say("One layer is five times three, which is fifteen cubes.")],
    [emphasize("Two layers of fifteen is fifteen plus fifteen, which is thirty unit cubes altogether! That's the crate's volume — thirty cubic units!")],
    [say("Sofia, visiting from Brazil, shows her fish tank: six cubes long, two cubes wide, three cubes tall.")],
    [emphasize("Six times two times three equals thirty-six. Sofia's tank holds thirty-six cubic units of water!")],
    [say("Yuki and Amara compare two gift boxes to see which one holds more.")]
  ];
  return scripts[panelIndex] || [say("Let's explore volume!")];
}

export function simulateStationAIntro() {
  return [
    instruct("Drag the unit cubes into the box. Fill it layer by layer!"),
    ask("Make sure every space is filled. Can you do it?")
  ];
}

export function simulateStationBIntro() {
  return [
    instruct("Fill in one layer correctly, then watch it stack all the way up!")
  ];
}

export function simulateStationCIntro() {
  return [
    ask("Now fill in the missing number. Five times three times two equals what?")
  ];
}

export function correctFeedbackNarration() {
  return [celebrate("Excellent! You found the volume perfectly!")];
}

export function incorrectFeedbackNarration() {
  return [cheer("Not quite — let's look at the cubes again.")];
}

export function reflectNarration() {
  return [
    think("What a journey today! Can you describe how you would find the volume of your own school bag?"),
    celebrate("Lesson complete! You are a Volume Master!")
  ];
}
