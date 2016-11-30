const config = require('./config'),
    fs = require('fs'),
    path = require('path'),
    isDevelopment = config.isDevelopment,
    assetsManifest = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../../public/webpack-manifest.json'), 'utf-8')),
    iconsHtml = ''; //fs.readFileSync(path.resolve(__dirname + '/../client/blocks/Icons/Icons.html'), 'utf-8');

module.exports = function(content, state, res) {

    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>RAY</title>
        <link rel="shortcut icon" href="/favicon.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <script>
            window.appState = ${JSON.stringify(state)};
        </script>
        ${
            isDevelopment
                ? ''
                : '<link rel="stylesheet" href="' + assetsManifest['main.css'] + '" />'
        }
    </head>

    <body>
        <div class='app-container'>${content}</div>
        <script src="${
            isDevelopment
                ? '/bundle.js'
                : assetsManifest['main.js']
            }"></script>
        ${iconsHtml}
    </body>

    </html>`;
};
