require('babel-register');
// ignore imports of styl and css in server rendering via babel
require.extensions['.styl'] = () => {};
require.extensions['.css'] = () => {};
