const VISITOR_KEY = "uyp_vid";
const SESSION_UTM_KEY = "uyp_utm_session";
const FIRST_TOUCH_KEY = "uyp_first_touch";

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
type UtmKey = (typeof UTM_PARAMS)[number];
type UtmRecord = Partial<Record<UtmKey, string>>;

interface FirstTouch {
  first_referer: string | null;
  first_utm_source: string | null;
  first_utm_medium: string | null;
  first_utm_campaign: string | null;
  first_utm_content: string | null;
  first_utm_term: string | null;
}

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

function readUtmsFromUrl(): UtmRecord {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const out: UtmRecord = {};
  for (const k of UTM_PARAMS) {
    const v = url.searchParams.get(k);
    if (v) out[k] = v;
  }
  return out;
}

function readSessionUtms(): UtmRecord {
  try {
    const stored = sessionStorage.getItem(SESSION_UTM_KEY);
    return stored ? (JSON.parse(stored) as UtmRecord) : {};
  } catch {
    return {};
  }
}

function writeSessionUtms(utm: UtmRecord): void {
  try {
    sessionStorage.setItem(SESSION_UTM_KEY, JSON.stringify(utm));
  } catch {
    // ignore
  }
}

function readFirstTouch(): FirstTouch | null {
  try {
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? (JSON.parse(stored) as FirstTouch) : null;
  } catch {
    return null;
  }
}

function writeFirstTouchIfNew(utm: UtmRecord, referer: string | null): void {
  try {
    if (localStorage.getItem(FIRST_TOUCH_KEY)) return;
    const ft: FirstTouch = {
      first_referer: referer || null,
      first_utm_source: utm.utm_source ?? null,
      first_utm_medium: utm.utm_medium ?? null,
      first_utm_campaign: utm.utm_campaign ?? null,
      first_utm_content: utm.utm_content ?? null,
      first_utm_term: utm.utm_term ?? null,
    };
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(ft));
  } catch {
    // ignore
  }
}

function resolveUtms(): UtmRecord {
  // URL UTMs (current request) win; otherwise stick with session UTMs.
  const fromUrl = readUtmsFromUrl();
  if (Object.keys(fromUrl).length > 0) {
    writeSessionUtms(fromUrl);
    return fromUrl;
  }
  return readSessionUtms();
}

function buildBasePayload(path: string): Record<string, unknown> {
  const utm = resolveUtms();
  const referer = typeof document !== "undefined" ? document.referrer || null : null;
  writeFirstTouchIfNew(utm, referer);
  const firstTouch = readFirstTouch();

  return {
    visitor_id: getVisitorId(),
    host: window.location.hostname,
    path,
    referer,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    utm_source: utm.utm_source ?? null,
    utm_medium: utm.utm_medium ?? null,
    utm_campaign: utm.utm_campaign ?? null,
    utm_content: utm.utm_content ?? null,
    utm_term: utm.utm_term ?? null,
    first_referer: firstTouch?.first_referer ?? null,
    first_utm_source: firstTouch?.first_utm_source ?? null,
    first_utm_medium: firstTouch?.first_utm_medium ?? null,
    first_utm_campaign: firstTouch?.first_utm_campaign ?? null,
    first_utm_content: firstTouch?.first_utm_content ?? null,
    first_utm_term: firstTouch?.first_utm_term ?? null,
  };
}

function post(body: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export function trackView(path: string): void {
  if (typeof window === "undefined") return;
  post(buildBasePayload(path));
}

export function trackEvent(args: {
  eventType: string;
  formName?: string;
  path?: string;
  payload?: Record<string, unknown>;
}): void {
  if (typeof window === "undefined") return;
  const path = args.path ?? window.location.pathname + window.location.search;
  post({
    ...buildBasePayload(path),
    event_type: args.eventType,
    form_name: args.formName ?? null,
    payload: args.payload ?? null,
  });
}
