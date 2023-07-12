# vite-utils

This package contains utilities for working with Vite.
It exports only `index.js` and its types `index.d.ts`.
The reason why it's a JS file and not a TS file is because Vite cannot load TS that early for some reason.

❗️ This is solvable by introducing a build step.
