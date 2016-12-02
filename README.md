## Tech

 * Webpack 2
 * Express 4 + webpack dev server hot reload
 * React 15.4 (+ some babel optimizations including `transform-runtime`)
 * React hot module reload (including server-side thanks to decache in dev mode)
 * Server-side rendering (thanks to babel-register)
 * webpack manifest for production builds hashing
 * Stylus + autoprefixer

`babel-register` uses `.babelrc` with modules enabled, because it's not compiled via webpack 2.

Webpack in `webpack.config.js` uses separate babel config with disabled modules, so webpack can handle natively all `import`, `exports` to enable Tree Shaking for minimal bundle size.

Also there is no need to write `import React from 'react'` in every `*.jsx` file thanks to babel's `react-require` plugin.

## How
For production build (node start slow first time to compile JSX):
```
npm run build
NODE_ENV=production node src/back/server.js
```

For development (HMR and staff):
```
npm run dev
```
