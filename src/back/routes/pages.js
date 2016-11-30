const router = require('express').Router(),
    match = require('react-router/lib/match'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    RouterContext = require('react-router/lib/RouterContext'),

    errorHandler = require('../utils/express-utils').errorHandler,
    config = require('../config'),
    layout = require('../layout');

var Root = require('../../blocks/root/root.jsx').default;

router.get('*', (req, res) => {
    if (config.isDevelopment) {
        var decache = require('decache');
        decache('../client/blocks/Root/Root.jsx');

        Root = require('../../blocks/root/root.jsx').default;
    }

    const store = { getState() { return {}; }},
        content = ReactDOMServer.renderToString(
            React.createElement(Root, null)
        );

    res.send(layout(content, store.getState(), res));
});

module.exports = router;
