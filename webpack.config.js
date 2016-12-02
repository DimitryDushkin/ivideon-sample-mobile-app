const path = require('path'),
    webpack = require('webpack'),
    ManifestPlugin = require('webpack-plugin-manifest'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    isProd = process.env.NODE_ENV === 'production',
    publicFolder = path.join(__dirname, 'public');

module.exports = {
    entry: (function() {
        // Polyfills
        var entries = [
            'core-js/es6/symbol',
            // 'whatwg-fetch'
        ];

        if (!isProd) {
            entries.push('react-hot-loader/patch');
            entries.push('webpack/hot/dev-server');
            entries.push('webpack-hot-middleware/client');
        }

        entries.push('./src/front/index.jsx');

        return entries;
    })(),
    output: {
        path: publicFolder,
        publicPath: '/',
        filename: isProd ? 'bundle-[hash].js' : 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // Separate css loader to include pure css libraries
            {
                test: /\.css$/,
                loader: isProd
                    ? ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
                    : 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.styl$/,
                loader: isProd
                    ? ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'stylus-loader'])
                    : 'style-loader!css-loader!postcss-loader!stylus-loader'
            }
        ],
    },
    plugins: getPlugins(),
    devtool: isProd ? '' : '#eval',
    devServer: {
        contentBase: publicFolder,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};

function getPlugins() {
    var plugins = [
        // for stateless component so we do not need to import React manualy
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
        new webpack.ProvidePlugin({
            React: 'react',
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: {
                    plugins: [ require('autoprefixer') ]
                },
                babel: {
                    babelrc: false,
                    'presets': [
                        ['es2015', { 'modules': false }],
                        'react'
                    ],
                    'plugins': [
                        'transform-runtime',
                        'react-require'
                    ],
                    'env': {
                        'production': {
                            'plugins': [
                                'transform-react-constant-elements',
                                'transform-react-inline-elements',
                                'transform-react-remove-prop-types'
                            ]
                        },
                        'development': {
                            'plugins': [ 'react-hot-loader/babel' ]
                        }
                    }
                }
            }
        })
    ];

    if (isProd) {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new ExtractTextPlugin({
                filename: 'bundle-[hash].css',
                allChunks: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false,
                sourceMap: false
            }),
            new ManifestPlugin()
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        );
    }

    return plugins;
}
