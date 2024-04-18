set windows-shell := ["pwsh", "-NoLogo", "-NoProfileLoadTime", "-Command"]

build:
  npx esbuild --bundle --minify --outfile=dist/browser.min.js .\lib\browser\index.ts
  npx esbuild --bundle --outfile=dist/browser.js .\lib\browser\index.ts
