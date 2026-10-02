// NeoShort API Client
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://neoshort.onrender.com').replace(/\/+$/, '');

export async function apiConnectChannel(channelData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/youtube/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(channelData)
    });
    return await res.json();
  } catch (err) {
    console.warn("Backend connect offline, using local storage mode:", err);
    return null;
  }
}

export async function apiFetchUserProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/profile`);
    return await res.json();
  } catch (err) {
    console.warn("Backend profile offline:", err);
    return null;
  }
}

export async function apiFetchVideos() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/videos`);
    return await res.json();
  } catch (err) {
    console.warn("Backend videos offline:", err);
    return null;
  }
}

export async function apiGenerateAndUpload(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/pipeline/generate-and-upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.warn("Backend pipeline offline:", err);
    return null;
  }
}
