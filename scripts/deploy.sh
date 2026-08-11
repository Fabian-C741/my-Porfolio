#!/usr/bin/env bash
set -euo pipefail

# Deploy script for Cloudflare Pages + optional Worker
# Expects environment variables:
#   CLOUDFLARE_API_TOKEN - token with Pages publish scope
#   CF_PAGES_PROJECT - Cloudflare Pages project name
# Optional:
#   PUBLISH_WORKER=1 to publish the Worker via `wrangler publish`

# Build
echo "Installing dependencies and building..."
npm ci
if npm run build; then
  echo "Build complete"
else
  echo "No build step or build failed; continuing"
fi

# Require env
: "${CLOUDFLARE_API_TOKEN:?Please set CLOUDFLARE_API_TOKEN}"
: "${CF_PAGES_PROJECT:?Please set CF_PAGES_PROJECT}"

# Publish Pages
if [ -f "dist/index.html" ]; then
  echo "Publishing Cloudflare Pages (./dist → $CF_PAGES_PROJECT)"
  wrangler pages deploy ./dist --project-name "$CF_PAGES_PROJECT"
else
  echo "Error: ./dist/index.html not found. Build step must output ./dist" >&2
  exit 1
fi

# Optionally publish worker
if [ "${PUBLISH_WORKER:-}" = "1" ]; then
  echo "Publishing Worker (wrangler deploy)"
  wrangler deploy
fi

echo "Deploy finished."