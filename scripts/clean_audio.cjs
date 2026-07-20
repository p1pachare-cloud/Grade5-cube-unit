const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

if (fs.existsSync(AUDIO_DIR)) {
  const files = fs.readdirSync(AUDIO_DIR);
  console.log(`Auditing ${files.length} audio files in assets/audio/`);
} else {
  console.log('Audio directory clean.');
}
