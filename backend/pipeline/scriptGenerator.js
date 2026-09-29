import dotenv from 'dotenv';
dotenv.config();

/**
 * NeoShort AI Script & Hook Generator
 * Uses Gemini API with specialized YouTube Shorts viral structure:
 * - 0-3s: Curiosity Hook (High CTR)
 * - 4-30s: Fast-paced, punchy, high-retention storytelling
 * - 31-40s: Climax / Mind-blown takeaway + Subscribe trigger
 */
export async function generateShortScript(niche, topic = null, language = "English") {
  const apiKey = process.env.AI_API_KEY;
  const targetNiche = niche || "Mind-Blowing Facts & Science";

  const prompt = `You are the world's top viral YouTube Shorts director and scriptwriter.
Generate an ultra-engaging, 40-second YouTube Short script about: "${topic || targetNiche}".
Niche: ${targetNiche}
Language: ${language}

Strict requirements:
1. First 3 seconds MUST have an irresistible psychological hook that prevents the user from swiping away.
2. Fast-paced, concise, conversational narration (around 90 to 110 words total).
3. Optimized for 85%+ retention.

Return ONLY a valid JSON object without markdown fences, with these exact keys:
{
  "title": "Clickable high-CTR title with emojis and #shorts",
  "hook": "Exact first 5-8 words spoken",
  "narration": "Full voiceover text to be spoken by AI voice from start to finish",
  "keywords": ["visual_scene_1", "visual_scene_2", "visual_scene_3"],
  "tags": ["#shorts", "#viral", "#facts", "#trending"]
}`;

  if (!apiKey) {
    console.warn("AI_API_KEY not found, using fallback script.");
    return getFallbackScript(targetNiche, topic);
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const rawText = data.candidates[0].content.parts[0].text;
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const scriptData = JSON.parse(cleanJson);
      return scriptData;
    } else {
      console.warn("Gemini API returned unexpected format, falling back.");
      return getFallbackScript(targetNiche, topic);
    }
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return getFallbackScript(targetNiche, topic);
  }
}

function getFallbackScript(niche, topic) {
  return {
    title: `${topic || "The Deep Sea Secret"} Nobody Talks About 🌊😱 #shorts #facts`,
    hook: "Scientists found something 30,000 feet deep...",
    narration: "Scientists sent an autonomous submarine 30,000 feet into the Mariana Trench. At first, all they saw was pitch-black darkness. But suddenly, strange acoustic frequencies registered on their sonars. What they captured wasn't a whale or volcanic rumble—it was an artificial pattern repeated every 40 seconds. To this day, oceanographers cannot explain what created it. Follow for more mind-bending ocean mysteries!",
    keywords: ["ocean depth", "underwater submarine", "dark abyss", "sonar signals"],
    tags: ["#shorts", "#facts", "#mystery", "#science", "#trending"]
  };
}
