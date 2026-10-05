import { google } from 'googleapis';
import fs from 'fs';

/**
 * Uploads a compiled vertical MP4 video directly to YouTube as a Short
 */
export async function uploadVideoToYouTube({ authClient, videoPath, title, description, tags, privacyStatus = 'public' }) {
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video file does not exist at ${videoPath}`);
  }

  const youtube = google.youtube({ version: 'v3', auth: authClient });

  // Ensure title contains #shorts for YouTube algorithm detection
  let formattedTitle = title || 'Viral AI Short';
  if (!formattedTitle.toLowerCase().includes('#shorts')) {
    formattedTitle = `${formattedTitle} #shorts`;
  }
  // YouTube title limit is 100 chars
  if (formattedTitle.length > 100) {
    formattedTitle = formattedTitle.slice(0, 92) + ' #shorts';
  }

  const fullDescription = `${description || ''}\n\n#Shorts #Viral #Trending\nAuto-created & scheduled via NeoShort AI`;

  console.log(`[YouTube Uploader] Initiating upload to YouTube: "${formattedTitle}" (Privacy: ${privacyStatus})...`);

  const response = await youtube.videos.insert({
    part: ['snippet', 'status'],
    notifySubscribers: true,
    requestBody: {
      snippet: {
        title: formattedTitle,
        description: fullDescription,
        tags: tags || ['#shorts', '#viral', '#trending'],
        categoryId: '28' // Science & Technology
      },
      status: {
        privacyStatus: privacyStatus,
        selfDeclaredMadeForKids: false
      }
    },
    media: {
      body: fs.createReadStream(videoPath)
    }
  });

  const videoId = response.data.id;
  const shortUrl = `https://youtube.com/shorts/${videoId}`;

  console.log(`[YouTube Uploader] ✅ Upload successful! Live Short URL: ${shortUrl}`);

  return {
    success: true,
    videoId: videoId,
    youtubeUrl: shortUrl,
    title: formattedTitle,
    privacyStatus: privacyStatus
  };
}
