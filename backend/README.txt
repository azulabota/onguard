OnGuard backend (Vercel Functions)

This folder is a minimal backend scaffold for near real-time Solana monitoring.

Endpoints
- GET /api/health
- POST /api/helius-webhook?secret=... (Helius webhook receiver)

Env vars
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- HELIUS_WEBHOOK_SECRET

Supabase
- Apply docs/SUPABASE_SCHEMA.sql
