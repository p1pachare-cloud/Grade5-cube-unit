const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

const AUDIO_SCRIPTS = [
  { file: 'audio_wonder_hook_0.mp3', text: "Sarah is packing a toy box. It's four cubes long, three cubes wide, and two cubes tall." },
  { file: 'audio_wonder_hook_1.mp3', text: "How many little cube blocks can fit inside altogether?" },
  { file: 'audio_wonder_hook_2.mp3', text: "Let's discover what volume really means!" },
  { file: 'audio_story_panel1_0.mp3', text: "John and his friend Mike are building a model shipping crate for the school science fair." },
  { file: 'audio_story_panel2_0.mp3', text: "The crate is five cubes long, three cubes wide, and two cubes high. Let's fill it with unit cubes and count them!" },
  { file: 'audio_story_panel3_0.mp3', text: "One layer is five times three, which is fifteen cubes." },
  { file: 'audio_story_panel4_0.mp3', text: "Two layers of fifteen is fifteen plus fifteen, which is thirty unit cubes altogether! That's the crate's volume — thirty cubic units!" },
  { file: 'audio_story_panel5_0.mp3', text: "Sofia, visiting from Brazil, shows her fish tank: six cubes long, two cubes wide, three cubes tall." },
  { file: 'audio_story_panel6_0.mp3', text: "Six times two times three equals thirty-six. Sofia's tank holds thirty-six cubic units of water!" },
  { file: 'audio_story_panel7_0.mp3', text: "Yuki and Amara compare two gift boxes to see which one holds more." },
  { file: 'audio_station_a_instruction_0.mp3', text: "Drag the unit cubes into the box. Fill it layer by layer!" },
  { file: 'audio_station_a_instruction_1.mp3', text: "Make sure every space is filled. Can you do it?" },
  { file: 'audio_station_b_instruction_0.mp3', text: "Fill in one layer correctly, then watch it stack all the way up!" },
  { file: 'audio_station_c_instruction_0.mp3', text: "Now fill in the missing number. Five times three times two equals what?" },
  { file: 'audio_correct_0.mp3', text: "Excellent! You found the volume perfectly!" },
  { file: 'audio_incorrect_0.mp3', text: "Not quite — let's look at the cubes again." },
  { file: 'audio_hint_layer_0.mp3', text: "Watch me stack the layers! Can you count with me?" },
  { file: 'audio_reflect_prompt_0.mp3', text: "What a journey today! Can you describe how you would find the volume of your own school bag?" },
  { file: 'audio_reflect_complete_0.mp3', text: "Lesson complete! You are a Volume Master!" }
];

async function generateAudio(item) {
  const filePath = path.join(AUDIO_DIR, item.file);
  if (fs.existsSync(filePath)) {
    console.log(`[SKIP] Already exists: ${item.file}`);
    return;
  }

  if (!API_KEY) {
    console.warn(`[WARN] VITE_ELEVENLABS_API_KEY missing. Skipping API generation for ${item.file}`);
    return;
  }

  console.log(`[GENERATE] Requesting ElevenLabs for: ${item.file}`);
  const payload = JSON.stringify({
    text: item.text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: { stability: 0.20, similarity_boost: 0.55, style: 0.50 }
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`[ERROR] HTTP ${res.statusCode} for ${item.file}`);
        resolve();
        return;
      }
      const writeStream = fs.createWriteStream(filePath);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log(`[SUCCESS] Saved ${item.file}`);
        resolve();
      });
    });
    req.on('error', (err) => {
      console.error(`[FAIL] ${item.file}:`, err.message);
      resolve();
    });
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('--- Starting Audio Generation Pipeline ---');
  for (const item of AUDIO_SCRIPTS) {
    await generateAudio(item);
  }
  console.log('--- Finished Audio Generation Pipeline ---');
}

run();
