require('babel-register')(
    {
        presets:  [
            'react',
            [ 'env', { 'targets': { 'node': true } } ]
        ],
        plugins: ['react-require']
    }
);
// ignore imports of styl and css in server rendering via babel
require.extensions['.styl'] = () => {};
require.extensions['.css'] = () => {};
