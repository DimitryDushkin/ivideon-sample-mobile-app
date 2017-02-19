const router = require('express').Router(),
    match = require('react-router/lib/match'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    RouterContext = require('react-router/lib/RouterContext'),

    errorHandler = require('../utils/express-utils').errorHandler,
    config = require('../config'),
    layout = require('../layout'),
    rootComponentPath = '../../front/blocks/root/root.jsx',
    setupStorePath = '../../front/store/setupStore.js';

var Root = require(rootComponentPath).default,
    setupStore = require(setupStorePath).default;

router.get('*', (req, res) => {
    if (config.isDevelopment) {
        var decache = require('decache');
        decache(rootComponentPath);
        decache(setupStorePath);

        Root = require(rootComponentPath).default;
        setupStore = require(setupStorePath).default;
    }

    const store = setupStore({}),
        content = ReactDOMServer.renderToString(<Root store={ store} />);

    res.send(layout(content, store.getState(), res));
});

module.exports = router;
