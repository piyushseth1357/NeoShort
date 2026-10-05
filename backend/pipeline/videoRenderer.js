import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';
import path from 'path';

// Set bundled ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Renders a compliant 9:16 vertical YouTube Short MP4
 * Combines generated neural audio with vertical 1080x1920 visual layout
 */
export function renderShortVideo({ audioPath, outputPath, duration }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(audioPath)) {
      return reject(new Error(`Audio file not found at ${audioPath}`));
    }

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Build 1080x1920 vertical canvas with gradient background and 30fps
    // -f lavfi -i color=c=0x0e0e17:s=1080x1920:r=30
    ffmpeg()
      .input('color=c=0x0d0d17:s=1080x1920:r=30')
      .inputFormat('lavfi')
      .input(audioPath)
      .outputOptions([
        '-c:v libx264',
        '-pix_fmt yuv420p',
        '-c:a aac',
        '-b:a 192k',
        '-shortest', // Stop video when audio ends
        '-movflags +faststart'
      ])
      .output(outputPath)
      .on('start', (cmd) => {
        console.log('[FFmpeg] Compiling 9:16 vertical Short:', cmd);
      })
      .on('end', () => {
        console.log('[FFmpeg] Short successfully compiled to:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('[FFmpeg] Compilation error:', err.message);
        reject(err);
      })
      .run();
  });
}
