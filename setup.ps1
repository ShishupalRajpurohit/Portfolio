$ErrorActionPreference = 'Stop'

Write-Host "Shishupal Portfolio setup" -ForegroundColor Cyan
Write-Host "Recommended Node.js: 24.19.0 LTS (works with Next.js 16.3.4 and your current Windows install)." -ForegroundColor Gray

if (Get-Command nvm -ErrorAction SilentlyContinue) {
  try { nvm install 24.19.0 } catch { Write-Host "Node 24.19.0 is already installed or nvm reported a non-fatal message." -ForegroundColor Yellow }
  nvm use 24.19.0
} else {
  Write-Warning "nvm-windows was not found. Continuing with the currently installed Node.js if it satisfies >=20.9.0 <25."
}

node --version
npm --version

$nodeMajor = [int]((node --version) -replace '^v','').Split('.')[0]
$nodeMinor = [int]((node --version) -replace '^v','').Split('.')[1]
if ($nodeMajor -lt 20 -or ($nodeMajor -eq 20 -and $nodeMinor -lt 9) -or $nodeMajor -ge 25) {
  throw "Unsupported Node.js version. Required: >=20.9.0 <25. Current: $(node --version)"
}

if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }
if (Test-Path package-lock.json) { Remove-Item package-lock.json -Force }
if (Test-Path .next) { Remove-Item .next -Recurse -Force }

npm install
npm run typecheck
npm run lint
npm audit --audit-level=moderate
npm run build

Write-Host "Setup and verification completed." -ForegroundColor Green
