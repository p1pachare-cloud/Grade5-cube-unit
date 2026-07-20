import { audioMap } from './audioMap';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'encouragement' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct = (text) => ({ text, style: 'instruction' });

const dynamicCache = new Map();
let activeAudio = null;
let currentQueueSymbol = null;

export async function getAudioUrl(text, style = 'statement', apiKey = null) {
  if (audioMap[text]) return audioMap[text];

  const cacheKey = `${text}::${style}`;
  if (dynamicCache.has(cacheKey)) return dynamicCache.get(cacheKey);

  const envKey = apiKey || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_ELEVENLABS_API_KEY : null);
  if (!envKey) return null;

  try {
    const settings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': envKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: settings,
      }),
    });

    if (!res.ok) return null;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    dynamicCache.set(cacheKey, url);
    return url;
  } catch (err) {
    return null;
  }
}

export function stopNarration() {
  currentQueueSymbol = Symbol();
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
}

export async function narrate(segments, apiKey = null, onSegmentStart = null) {
  stopNarration();
  const queueSymbol = Symbol();
  currentQueueSymbol = queueSymbol;

  const segmentList = Array.isArray(segments) ? segments : [segments];

  for (let i = 0; i < segmentList.length; i++) {
    if (currentQueueSymbol !== queueSymbol) break;

    const seg = segmentList[i];
    const text = typeof seg === 'string' ? seg : seg.text;
    const style = typeof seg === 'string' ? 'statement' : seg.style || 'statement';

    const url = await getAudioUrl(text, style, apiKey);
    if (currentQueueSymbol !== queueSymbol) break;
    if (!url) continue;

    // Eager preload next segment
    if (i + 1 < segmentList.length) {
      const nextSeg = segmentList[i + 1];
      const nextText = typeof nextSeg === 'string' ? nextSeg : nextSeg.text;
      const nextStyle = typeof nextSeg === 'string' ? 'statement' : nextSeg.style || 'statement';
      getAudioUrl(nextText, nextStyle, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);

    await new Promise((resolve) => {
      const audio = new Audio(url);
      activeAudio = audio;
      audio.onended = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };
      audio.onerror = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };
      audio.play().catch(resolve);
    });
  }
}
