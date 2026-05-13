const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const VISITOR_KEY = "uyp_vid";

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function trackView(path: string): void {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  if (typeof window === "undefined") return;

  const payload = {
    visitor_id: getVisitorId(),
    host: window.location.hostname,
    path,
    referer: document.referrer || null,
    user_agent: navigator.userAgent || null,
  };

  fetch(`${SUPABASE_URL}/rest/v1/site_views`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
