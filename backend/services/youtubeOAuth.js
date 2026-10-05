import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

/**
 * Creates an OAuth2 Client instance
 */
export function createOAuth2Client(redirectUri) {
  const defaultRedirect = process.env.RENDER_EXTERNAL_URL 
    ? `${process.env.RENDER_EXTERNAL_URL}/api/youtube/oauth2callback`
    : 'https://neoshort.onrender.com/api/youtube/oauth2callback';

  return new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirectUri || defaultRedirect
  );
}

/**
 * Generates the Google OAuth Consent URL
 */
export function getAuthUrl(redirectUri, state = {}) {
  const oauth2Client = createOAuth2Client(redirectUri);
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // Critical for receiving refresh_token to upload 24/7
    scope: SCOPES,
    prompt: 'consent', // Ensures refresh token is granted every time
    state: JSON.stringify(state)
  });
}

/**
 * Exchanges authorization code for access and refresh tokens
 */
export async function getTokensFromCode(code, redirectUri) {
  const oauth2Client = createOAuth2Client(redirectUri);
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

/**
 * Creates an authorized OAuth2 client using stored tokens
 */
export function getAuthenticatedClient(tokens, redirectUri) {
  const oauth2Client = createOAuth2Client(redirectUri);
  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

/**
 * Fetches real YouTube Channel details for the authenticated user
 */
export async function getChannelInfo(authClient) {
  const youtube = google.youtube({ version: 'v3', auth: authClient });
  
  const response = await youtube.channels.list({
    part: ['snippet', 'statistics'],
    mine: true
  });

  if (!response.data.items || response.data.items.length === 0) {
    throw new Error('No YouTube channel found for this Google account. Please create a YouTube channel on this account first.');
  }

  const channel = response.data.items[0];
  const snippet = channel.snippet || {};
  const stats = channel.statistics || {};

  return {
    id: channel.id,
    title: snippet.title || 'YouTube Channel',
    handle: snippet.customUrl ? (snippet.customUrl.startsWith('@') ? snippet.customUrl : '@' + snippet.customUrl) : ('@' + (snippet.title || 'creator').toLowerCase().replace(/\s+/g, '')),
    avatar: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    subscribers: stats.subscriberCount ? `${stats.subscriberCount} Subs` : '0 Subs',
    videoCount: stats.videoCount || 0
  };
}
