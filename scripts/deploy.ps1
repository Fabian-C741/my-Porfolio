<#
PowerShell deploy script for Cloudflare Pages + optional Worker
Usage:
  # in PowerShell
  $env:CLOUDFLARE_API_TOKEN = "<token>"
  $env:CF_PAGES_PROJECT = "<pages_project>"
  ./scripts/deploy.ps1 -PublishWorker
#>
param(
  [switch]$PublishWorker
)

Write-Host "Installing dependencies and building..."
npm ci
try {
  npm run build | Out-Null
  Write-Host "Build complete"
} catch {
  Write-Host "No build step or build failed; continuing"
}

if (-not $env:CLOUDFLARE_API_TOKEN) { Write-Error "Set CLOUDFLARE_API_TOKEN"; exit 1 }
if (-not $env:CF_PAGES_PROJECT) { Write-Error "Set CF_PAGES_PROJECT"; exit 1 }

if (-Not (Test-Path -Path ./dist)) { Write-Error "./dist not found. Build must output ./dist"; exit 1 }

Write-Host "Publishing Cloudflare Pages (./dist → $env:CF_PAGES_PROJECT)"
wrangler pages deploy ./dist --project-name $env:CF_PAGES_PROJECT

if ($PublishWorker) {
  Write-Host "Publishing Worker (wrangler deploy)"
  wrangler deploy
}

Write-Host "Deploy finished."