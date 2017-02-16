// require hook for transpile jsx requires in runtime
require('./utils/babel-register');

const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    uuid = require('uuid'),

    config = require('./config'),
    routerPages = require('./routes/pages');

app.use('/ping', (req, res) => res.send('i\'m alive'));

if (config.isDevelopment) {
    // add webpack hot reloading
    require('./utils/webpack-dev-middleware')(app);
    // require('./utils/dev-https')(app);
} else {
    app.use(compression());
}

app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());

app.use(routerPages);

app.listen(config.port, () => {
    console.log('App at http://localhost:' + config.port);
});
