import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const EnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  HELIUS_WEBHOOK_SECRET: z.string().min(12),
});

function getEnv() {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Missing env vars: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}`);
  }
  return parsed.data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

  // Security: when you create the webhook at Helius, set the URL to include ?secret=...
  const secret = String(req.query.secret ?? "");

  let env;
  try {
    env = getEnv();
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "env_error" });
  }

  if (!secret || secret !== env.HELIUS_WEBHOOK_SECRET) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Helius sends an array of event objects (often). We store raw payload for now.
  const payload = req.body;

  // Save as an event row; dedupe later via signature fields once we finalize schema.
  const { error } = await supabase.from("solana_webhook_events").insert({
    received_at: new Date().toISOString(),
    payload,
    processed: false,
  });

  if (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }

  return res.status(200).json({ ok: true });
}
