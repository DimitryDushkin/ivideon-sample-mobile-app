const https = require('https'),
    fs = require('fs');

module.exports = function(app) {
    console.log('Server also works on https://di.yandex.ru');

    https
        .createServer({
            key: fs.readFileSync(__dirname + '/../../../dev-certs/key.pem', 'utf8'),
            cert: fs.readFileSync(__dirname + '/../../../dev-certs/server.crt', 'utf8')
        }, app)
        .listen(443);
};
