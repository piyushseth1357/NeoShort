import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';
import path from 'path';

// Set bundled ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Renders a compliant 9:16 vertical YouTube Short MP4
 * Combines generated neural audio with 1080x1920 visual layout and animated neon waveform
 */
export function renderShortVideo({ audioPath, outputPath, title = "NeoShort AI", bgImage = null }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(audioPath)) {
      return reject(new Error(`Audio file not found at ${audioPath}`));
    }

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Default background: sleek vertical gradient canvas
    const cmd = ffmpeg();

    if (bgImage && fs.existsSync(bgImage)) {
      cmd
        .input(bgImage)
        .loop()
        .input(audioPath)
        .complexFilter([
          '[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[bg]',
          '[1:a]showwaves=s=920x220:mode=cline:colors=0xff2d55|0xffffff:rate=30[wave]',
          '[bg][wave]overlay=(W-w)/2:H-h-240[outv]'
        ])
        .outputOptions([
          '-map [outv]',
          '-map 1:a',
          '-c:v libx264',
          '-pix_fmt yuv420p',
          '-c:a aac',
          '-b:a 192k',
          '-shortest',
          '-movflags +faststart'
        ]);
    } else {
      cmd
        .input('color=c=0x0a0a14:s=1080x1920:r=30')
        .inputFormat('lavfi')
        .input(audioPath)
        .complexFilter([
          '[1:a]showwaves=s=920x260:mode=cline:colors=0xff2d55|0xffffff:rate=30[wave]',
          '[0:v][wave]overlay=(W-w)/2:(H-h)/2[outv]'
        ])
        .outputOptions([
          '-map [outv]',
          '-map 1:a',
          '-c:v libx264',
          '-pix_fmt yuv420p',
          '-c:a aac',
          '-b:a 192k',
          '-shortest',
          '-movflags +faststart'
        ]);
    }

    cmd
      .output(outputPath)
      .on('start', (commandLine) => {
        console.log('[FFmpeg] Compiling 9:16 vertical Short:', commandLine);
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
