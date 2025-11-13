import { commentaryData } from "@/data/commentary";

type FetchResult = { text: string; source: "edge" | "static" | "cache" };

const TTL = 10 * 60 * 1000; // 10 minutes cache TTL
const TIMEOUT_MS = 2500;

function chooseStatic(section: keyof typeof commentaryData): string {
  const arr = commentaryData[section] ?? commentaryData.idle;
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function getCommentary(section: keyof typeof commentaryData = "idle"): Promise<FetchResult> {
  const now = Date.now();
  const key = `commentary:${section}`;

  // Cache check
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.ts && now - parsed.ts < TTL && parsed.text) {
        return { text: parsed.text, source: "cache" };
      }
    }
  } catch {
    // ignore parse errors
  }

  // Try edge (with timeout)
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`/api/commentary?section=${encodeURIComponent(section)}`, {
      signal: controller.signal,
    });
    clearTimeout(id);

    if (res.ok) {
      const json = await res.json();
      const text = (json?.text || "").trim();
      if (text) {
        try {
          localStorage.setItem(key, JSON.stringify({ text, ts: now }));
        } catch {}
        return { text, source: "edge" };
      }
    }
  } catch {
    // fetch failed or aborted -> fallback
    clearTimeout(id);
  }

  // Static fallback
  const staticText = chooseStatic(section);
  try {
    localStorage.setItem(key, JSON.stringify({ text: staticText, ts: now }));
  } catch {}
  return { text: staticText, source: "static" };
}
