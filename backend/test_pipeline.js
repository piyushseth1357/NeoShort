import { generateShortScript } from './pipeline/scriptGenerator.js';
import { generateVoiceover } from './pipeline/voiceGenerator.js';
import { renderShortVideo } from './pipeline/videoRenderer.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log("=== Testing NeoShort Autonomous Pipeline ===");
  
  console.log("\n1. Generating viral script (Hindi & English)...");
  const script = await generateShortScript("Mind-Blowing Facts & Science", "The Mariana Trench Mystery", "Hindi");
  console.log("Title:", script.title);
  console.log("Hook:", script.hook);
  console.log("Narration snippet:", script.narration.substring(0, 100) + "...");
  console.log("Tags:", script.tags.join(" "));

  console.log("\n2. Generating natural human AI Voiceover using Edge-TTS...");
  const outputDir = path.join(__dirname, 'output', 'test_run');
  const voiceResult = await generateVoiceover(script.narration, outputDir, "hi-IN-MadhurNeural");
  console.log("✅ Voice audio generated successfully!");
  console.log("Audio file path:", voiceResult.audioPath);
  console.log("File size:", voiceResult.sizeBytes, "bytes");

  console.log("\n3. Rendering 9:16 Vertical Short MP4 via FFmpeg with animated waveform...");
  const mp4Path = path.join(outputDir, 'short.mp4');
  await renderShortVideo({
    audioPath: voiceResult.audioPath,
    outputPath: mp4Path,
    title: script.title
  });

  const mp4Size = fs.statSync(mp4Path).size;
  console.log(`✅ MP4 Video rendered successfully! Size: ${mp4Size} bytes at ${mp4Path}`);
  console.log("\n=== 100% Complete Pipeline Test Passed! ===");
}

runTest().catch(console.error);
