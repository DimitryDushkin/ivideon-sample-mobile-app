// require hook for transpile jsx requires in runtime
require('./utils/babel-register');

const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    compression = require('compression'),
    bodyParser = require('body-parser'),

    config = require('./config'),
    routerPages = require('./routes/pages');

app.use('/ping', (req, res) => res.send('i\'m alive'));

if (config.isDevelopment) {
    // add webpack hot reloading
    require('./utils/webpack-dev-middleware')(app);
} else {
    app.use(compression());
}

app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());

app.use(routerPages);

app.listen(config.port, () => {
    console.log('App at http://localhost:' + config.port);
});
