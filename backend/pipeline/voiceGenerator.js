import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import fs from "fs";
import path from "path";

/**
 * NeoShort Voiceover Engine (Edge-TTS)
 * 100% Free studio-grade Neural Voices
 * Available voices:
 * - "en-US-ChristopherNeural" (Deep documentary style)
 * - "en-US-GuyNeural" (High-energy fast paced)
 * - "hi-IN-MadhurNeural" (Natural Hindi Male)
 * - "hi-IN-SwaraNeural" (Natural Hindi Female)
 */
export async function generateVoiceover(text, outputDir, voice = "en-US-ChristopherNeural") {
  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // toFile saves audio.mp3 in the target directory
    await tts.toFile(outputDir, text);
    
    const audioPath = path.join(outputDir, "audio.mp3");
    const exists = fs.existsSync(audioPath);

    return {
      success: true,
      audioPath,
      voice,
      sizeBytes: exists ? fs.statSync(audioPath).size : 0
    };
  } catch (err) {
    console.error("Voice generation failed:", err);
    throw err;
  }
}
