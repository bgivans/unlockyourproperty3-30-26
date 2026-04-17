const GHL_WEBHOOKS = {
  adu: "https://services.leadconnectorhq.com/hooks/l9C6nPm57J1BlhJ0E4NU/webhook-trigger/50bd1d23-c7ba-4e0d-afde-70e2a2e8e603",
  probate: "https://services.leadconnectorhq.com/hooks/2jmjVmmtwFkdAqB4opPl/webhook-trigger/8ed80b41-524c-4fa1-a9ad-2f112b20dcc3",
  general: "https://services.leadconnectorhq.com/hooks/QrteOz1XubOssAJg36Ux/webhook-trigger/ae2e473b-ee16-486d-b2c5-3b6c40842d0b",
} as const;

function getWebhookUrl(data: Record<string, unknown>, formName: string): string {
  if (formName === "ADU Feasibility Guide Download") return GHL_WEBHOOKS.adu;
  if (formName === "Probate Property Review") return GHL_WEBHOOKS.probate;

  const situation = data.situation as string | undefined;
  if (situation === "adu-development") return GHL_WEBHOOKS.adu;
  if (situation === "inherited-probate") return GHL_WEBHOOKS.probate;

  return GHL_WEBHOOKS.general;
}

function buildPayload(data: Record<string, unknown>): Record<string, unknown> {
  return {
    name: data.name ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    propertyAddress: data.address ?? "",
    notes: data.description ?? data.notes ?? "",
  };
}

export async function submitForm(
  data: Record<string, unknown>,
  formName: string
): Promise<void> {
  const url = getWebhookUrl(data, formName);
  const payload = buildPayload(data);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`GHL webhook failed: ${res.status}`);
}
