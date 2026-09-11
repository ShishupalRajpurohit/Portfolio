$ErrorActionPreference = 'Stop'

Write-Host "Shishupal Portfolio - Cache Cleanup" -ForegroundColor Cyan
Write-Host "1. Next.js cache only (.next)"
Write-Host "2. Full project reset (node_modules + package-lock.json + .next)"
Write-Host "3. Full project reset + npm global cache"
$choice = Read-Host "Choose 1, 2, or 3"

switch ($choice) {
  '1' {
    if (Test-Path .next) { Remove-Item .next -Recurse -Force }
    Write-Host "Cleared .next cache." -ForegroundColor Green
  }
  '2' {
    if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }
    if (Test-Path package-lock.json) { Remove-Item package-lock.json -Force }
    if (Test-Path .next) { Remove-Item .next -Recurse -Force }
    npm cache verify
    npm install
    Write-Host "Full project reset completed." -ForegroundColor Green
  }
  '3' {
    if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }
    if (Test-Path package-lock.json) { Remove-Item package-lock.json -Force }
    if (Test-Path .next) { Remove-Item .next -Recurse -Force }
    npm cache clean --force
    npm install
    Write-Host "Full project + npm cache reset completed." -ForegroundColor Green
  }
  default { throw "Invalid choice. Run .\clean-cache.ps1 again and choose 1, 2, or 3." }
}

Write-Host "Next: npm run typecheck; npm run lint; npm run build" -ForegroundColor Yellow
