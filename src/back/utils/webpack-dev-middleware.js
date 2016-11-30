module.exports = function(app) {
    const webpack = require('webpack'),
        webpackConfig = require(__dirname + '/../../../webpack.config.js'),
        webpackCompiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true
    }));

    app.use(require('webpack-hot-middleware')(webpackCompiler));
};
