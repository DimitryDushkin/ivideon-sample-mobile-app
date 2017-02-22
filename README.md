## What's that
Sample mobile web app rendering public-avaliable cameras using [https://ivideon.com](Ivideon) API.

App is here — https://dimitrydushkin.github.io/ivideon-sample-mobile-app/public/.

## What's done
 * React 15.x + Redux 5.x
 * Data from API normalized using [https://github.com/paularmstrong/normalizr/](normalizer) to prevent camera duplicates
 * Bundled by webpack 2 (+ tree shaking to reduce bundle size)
 * Babel configured to transpile code based on set of targeted browsers (via [https://github.com/babel/babel-preset-env](babel-preset-env))
 * Webpack dev server hot reload
 * webpack manifest for production builds hashing
 * Stylus + autoprefixer
 
## What's can be done
 * Refresh selected camera every 10 seconds via redux middleware
 * Unit-testing
 * Server-side rendering
 * Split `bundle.js` to vendor components and custom
 * Speed up cameras' list rendering using [https://github.com/seatgeek/react-infinite](react-infinite)
 * Switch to `preact` (3 Kb) to reduce bundle size or `inferno` (9 Kb) to speed rendering up to 2-3x. `react`'s size is 45 Kb minified and gziped.
 * Content security policy setup via [https://github.com/helmetjs/helmet](helmet).


## Tips
There is no need to write `import React from 'react'` in every `*.js` file thanks to babel's `react-require` plugin.

## How to start
For production build (node start slow first time to compile JSX):
```
yarn           # or npm i
yarn run dev   # or npm run dev
open http://localhost:8080
```
