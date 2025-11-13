export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const section = url.searchParams.get("section") ?? "idle";

    const prompt = `
Generate a single introspective one-line commentary appropriate for a terminal-style personal portfolio.
Tone: minimal, reflective, slightly poetic. No questions. Section: ${section}.
Return only the single-line text, max ~22 words.
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      // Return a neutral response so client falls back to static text gracefully
      return new Response(JSON.stringify({ text: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await openaiRes.json();
    let text = data?.choices?.[0]?.message?.content || "";
    text = text.replace(/\n+/g, " ").trim();
    if (!text) text = null;

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // On any error, return null so client uses static fallback
    return new Response(JSON.stringify({ text: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
