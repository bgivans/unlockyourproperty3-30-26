export const config = { runtime: "edge" };

interface TrackPayload {
  visitor_id?: string;
  host?: string;
  path?: string;
  referer?: string | null;
  user_agent?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  first_referer?: string | null;
  first_utm_source?: string | null;
  first_utm_medium?: string | null;
  first_utm_campaign?: string | null;
  first_utm_content?: string | null;
  first_utm_term?: string | null;
  event_type?: string;
  form_name?: string | null;
  payload?: Record<string, unknown> | null;
}

const SB_URL = process.env.VITE_SUPABASE_URL;
const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY;

async function sbRequest(
  path: string,
  init: { method: string; body?: string; prefer?: string }
): Promise<Response> {
  if (!SB_URL || !SB_KEY) {
    return new Response(null, { status: 500 });
  }
  return fetch(`${SB_URL}/rest/v1${path}`, {
    method: init.method,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: init.prefer ?? "return=minimal",
    },
    body: init.body,
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  let body: TrackPayload;
  try {
    body = (await req.json()) as TrackPayload;
  } catch {
    return new Response("bad json", { status: 400 });
  }

  if (!body.visitor_id || !body.host || !body.path) {
    return new Response("missing fields", { status: 400 });
  }

  const country = req.headers.get("x-vercel-ip-country") || null;
  const region = req.headers.get("x-vercel-ip-country-region") || null;
  const cityRaw = req.headers.get("x-vercel-ip-city");
  const city = cityRaw ? decodeURIComponent(cityRaw) : null;

  const visitorId = body.visitor_id;
  const isEvent = Boolean(body.event_type);

  // Insert visitor on first touch. If the visitor already exists, the unique
  // constraint on visitor_id returns 409 — we ignore it (existing first-touch
  // data stays). PostgREST upsert via on_conflict would require anon SELECT
  // permission which we don't grant for privacy, so plain INSERT it is.
  await sbRequest("/visitors", {
    method: "POST",
    prefer: "return=minimal",
    body: JSON.stringify({
      visitor_id: visitorId,
      first_host: body.host,
      first_path: body.path,
      first_referer: body.first_referer ?? body.referer ?? null,
      first_utm_source: body.first_utm_source ?? body.utm_source ?? null,
      first_utm_medium: body.first_utm_medium ?? body.utm_medium ?? null,
      first_utm_campaign: body.first_utm_campaign ?? body.utm_campaign ?? null,
      first_utm_content: body.first_utm_content ?? body.utm_content ?? null,
      first_utm_term: body.first_utm_term ?? body.utm_term ?? null,
      first_country: country,
      first_region: region,
      first_city: city,
    }),
  }).catch(() => {});

  if (isEvent) {
    await sbRequest("/site_events", {
      method: "POST",
      body: JSON.stringify({
        visitor_id: visitorId,
        event_type: body.event_type,
        host: body.host,
        path: body.path,
        form_name: body.form_name ?? null,
        payload: body.payload ?? null,
      }),
    }).catch(() => {});
  } else {
    await sbRequest("/site_views", {
      method: "POST",
      body: JSON.stringify({
        visitor_id: visitorId,
        host: body.host,
        path: body.path,
        referer: body.referer ?? null,
        user_agent: body.user_agent ?? null,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
        utm_content: body.utm_content ?? null,
        utm_term: body.utm_term ?? null,
        country,
        region,
        city,
      }),
    }).catch(() => {});
  }

  return new Response(null, { status: 204 });
}
