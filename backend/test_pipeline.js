import { generateShortScript } from './pipeline/scriptGenerator.js';
import { generateVoiceover } from './pipeline/voiceGenerator.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTest() {
  console.log("=== Testing NeoShort Phase 7 Pipeline ===");
  
  console.log("\n1. Generating viral script...");
  const script = await generateShortScript("Mind-Blowing Facts & Science", "The Black Hole at the Center of Milky Way");
  console.log("Title:", script.title);
  console.log("Hook:", script.hook);
  console.log("Narration snippet:", script.narration.substring(0, 100) + "...");
  console.log("Tags:", script.tags.join(" "));

  console.log("\n2. Generating natural human AI Voiceover using Edge-TTS...");
  const outputDir = path.join(__dirname, 'output');
  const voiceResult = await generateVoiceover(script.narration, outputDir, "en-US-ChristopherNeural");
  console.log("✅ Voice audio generated successfully!");
  console.log("Audio file path:", voiceResult.audioPath);
  console.log("File size:", voiceResult.sizeBytes, "bytes");
  console.log("\n=== Phase 7 Script & Voice Test Passed! ===");
}

runTest().catch(console.error);
