var fs = require('fs'),
    envFilePath = '/etc/yandex/environment.type',
    env;

if (fs.existsSync(envFilePath)) {
    env = fs.readFileSync(envFilePath, 'utf8').trim();
} else {
    env = 'development';
}

module.exports = env;
