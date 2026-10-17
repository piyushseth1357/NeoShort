import { execFile, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * NeoShort Autonomous Neural Voiceover Engine
 * 1. Primary: Python edge-tts (Natural neural Microsoft voices: Madhur, Swara, Christopher, Guy)
 * 2. Fallback: Google Neural Speech Synthesizer (Zero credentials needed, 100% uptime)
 */
export async function generateVoiceover(text, outputDir, voice = "hi-IN-MadhurNeural") {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const audioPath = path.join(outputDir, "audio.mp3");

  // Attempt Tier 1: Python edge-tts
  try {
    console.log(`[VoiceEngine] Attempting Edge-TTS synthesis with voice: ${voice}...`);
    await synthesizeWithEdgeTTS(text, voice, audioPath);
    if (fs.existsSync(audioPath) && fs.statSync(audioPath).size > 1000) {
      console.log(`[VoiceEngine] Edge-TTS successfully synthesized ${fs.statSync(audioPath).size} bytes.`);
      return {
        success: true,
        audioPath,
        voice,
        provider: 'edge-tts',
        sizeBytes: fs.statSync(audioPath).size
      };
    }
  } catch (err) {
    console.warn(`[VoiceEngine] Edge-TTS failed (${err.message}). Falling back to Google TTS engine...`);
  }

  // Attempt Tier 2: Google Speech Synthesizer fallback
  try {
    const lang = voice.startsWith('hi') ? 'hi' : 'en';
    console.log(`[VoiceEngine] Synthesizing with Google TTS fallback (lang=${lang})...`);
    await synthesizeWithGoogleTTS(text, lang, audioPath);
    if (fs.existsSync(audioPath) && fs.statSync(audioPath).size > 500) {
      console.log(`[VoiceEngine] Google TTS successfully synthesized ${fs.statSync(audioPath).size} bytes.`);
      return {
        success: true,
        audioPath,
        voice,
        provider: 'google-tts',
        sizeBytes: fs.statSync(audioPath).size
      };
    }
  } catch (err) {
    console.error("[VoiceEngine] Google TTS fallback failed:", err.message);
  }

  throw new Error("All voice synthesis tiers failed.");
}

/**
 * Executes Python edge-tts CLI tool
 */
function synthesizeWithEdgeTTS(text, voice, outputPath) {
  return new Promise((resolve, reject) => {
    // Try 'python' and 'python3'
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const args = [
      '-m', 'edge_tts',
      '--voice', voice,
      '--text', text,
      '--write-media', outputPath
    ];

    const proc = spawn(pythonCmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';

    proc.stderr.on('data', (d) => {
      stderr += d.toString();
    });

    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(outputPath) && fs.statSync(outputPath).size > 1000) {
        resolve();
      } else {
        reject(new Error(stderr || `Process exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Downloads audio chunks from Google TTS and combines them
 */
async function synthesizeWithGoogleTTS(text, lang, outputPath) {
  // Split into sentence chunks under 150 chars
  const sentences = text.match(/[^.!?।]+[.!?।]+|[^.!?।]+/g) || [text];
  const chunks = [];
  let currentChunk = '';

  for (const s of sentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;
    if ((currentChunk + ' ' + trimmed).length < 140) {
      currentChunk += (currentChunk ? ' ' : '') + trimmed;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = trimmed.slice(0, 140);
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  const audioBuffers = [];

  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(chunk)}`;
    const buf = await fetchUrlBuffer(url);
    if (buf && buf.length > 0) {
      audioBuffers.push(buf);
    }
  }

  if (audioBuffers.length === 0) {
    throw new Error("No audio returned from Google TTS");
  }

  const combined = Buffer.concat(audioBuffers);
  fs.writeFileSync(outputPath, combined);
}

function fetchUrlBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrlBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}
