# Requirements & Clean Install

## Runtime
- Node.js: `24.19.0` recommended (any `>=20.9.0 <25` is supported)
- npm: `12.0.2` recommended
- Windows PowerShell is supported.

## Exact project dependencies
### Runtime
- next `16.3.4`
- react `19.2.8`
- react-dom `19.2.8`
- framer-motion `13.2.0`
- lucide-react `1.42.0`

### Development
- typescript `5.9.3`
- eslint `9.39.5`
- eslint-config-next `16.3.4`
- postcss `8.5.28`
- @types/node `26.5.0`
- @types/react `19.2.18`
- @types/react-dom `19.2.7`

You do **not** need to install these packages one-by-one. From the project folder, `npm install` installs the versions pinned in `package.json`.

## Fresh install / cache cleanup
If the project behaves strangely after an update, run this in PowerShell from the project folder:

```powershell
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run typecheck
npm run lint
npm run build
```

### Stronger cache reset (only if the normal reset does not help)
```powershell
npm cache clean --force
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm install
```

`npm cache clean --force` clears npm's global cache and is usually unnecessary. Prefer `npm cache verify` first.

## One-command PowerShell helper
Use:

```powershell
.\clean-cache.ps1
```

The helper gives you three choices: Next.js cache only, full project dependency/build cache, or full project cache plus npm's global cache.

## Verification
```powershell
npm run typecheck
npm run lint
npm run build
npm run dev
```

The current npm 12 warning about `unrs-resolver` install scripts is separate from the TypeScript/ESLint errors. First verify the fixed project; only approve that script if the project actually needs it.
