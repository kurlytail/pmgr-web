/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDebug = process.env.NODE_ENV === 'debug';
const isDist = isDebug || isProd ? '.min' : '';
const distPath = path.join(__dirname, 'dist');
const showConfigOnly = '1' === process.env.SHOW_CONFIG_ONLY || 'true' === process.env.SHOW_CONFIG_ONLY;

// Read dependencies key from package.json, and map out regex obj's
//   for advanced filtering.
let { dependencies } = require('./package.json');
dependencies = Object.keys(dependencies).map(key => {
    return new RegExp(`^${key}.*`);
});

const config = {
    entry: {
        app: './src/app.jsx'
    },

    output: {
        filename: `[name]${isDist}.js`,
        path: path.join(__dirname, 'dist'),
        pathinfo: !isProd,
        libraryTarget: 'var'
    },

    devtool: isProd ? false : 'inline-source-map',

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules', 'src']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Manager 1.0',
            filename: 'index.html',
            template: './src/html.jst'
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    'source-map-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true
                        }
                    }
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                exclude: /node_modules/,
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test : /\.css$/,
                loader: 'style-loader'
            },
            {
                test : /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test : /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: [
                    'file-loader'
                ]
            }
        ]
    },

    target: 'web'
};

if (isProd) {
    config.plugins.push(new UglifyEsPlugin({ mangle: true, compress: true }));
}

// If ran with SHOW_CONFIG_ONLY=1|true, only show the config and exit cleanly
if (showConfigOnly) {
    console.log(chalk.black.bgYellow.bold('Showing Configuration Only:'));
    console.log(require('util').inspect(config, false, null));
    process.exit(0);
}

module.exports = config;
