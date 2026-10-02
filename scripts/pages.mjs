import { writeFileSync } from "node:fs";

writeFileSync("dist/index.html", `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Accessible Component Library</title>
<style>body{font-family:system-ui;max-width:640px;margin:48px auto;padding:0 16px;line-height:1.5}a{color:#1d4ed8}</style></head>
<body><main><h1>Accessible Component Library</h1>
<p>A zero-dependency React design system, WCAG 2.1 AA, shared across apps with Webpack Module Federation.</p>
<ul>
<li><a href="storybook/">Storybook</a>: component docs with an accessibility panel</li>
<li><a href="host/">Host app</a>: loads components at runtime from the remote</li>
<li><a href="remote/">Remote app</a>: exposes the library via <code>remoteEntry.js</code></li>
</ul></main></body></html>`);
writeFileSync("dist/.nojekyll", "");
