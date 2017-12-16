/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDebug = process.env.NODE_ENV === 'debug';
const isDist = isDebug || isProd ? '.min' : '';
const distPath = path.join(__dirname, 'dist');
const dll_manifest_file = path.join(distPath, 'dependencies_dll.json');
const showConfigOnly = '1' === process.env.SHOW_CONFIG_ONLY || 'true' === process.env.SHOW_CONFIG_ONLY;

const DLLPlugin = new webpack.DllReferencePlugin({
    manifest: dll_manifest_file,
    sourceType: 'var'
});

// Read dependencies key from package.json, and map out regex obj's
//   for advanced filtering.
let { dependencies } = require('./package.json');
dependencies = Object.keys(dependencies).map(key => {
    return new RegExp(`^${key}.*`);
});

const config = {
    entry: ['./src/index.js'],

    output: {
        filename: `index${isDist}.js`,
        path: path.join(__dirname, 'dist'),
        pathinfo: !isProd,
        libraryTarget: 'commonjs2'
    },

    devtool: isProd ? false : 'inline-source-map',

    resolve: {
        extensions: ['.js'],
        modules: ['node_modules', 'src']
    },

    plugins: [
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
            }
        ]
    },

    target: 'node'
};

// Development Modifications
if (!isProd) {
    // Ensure Development DLL exists
    if (!isDebug && false === fs.existsSync(dll_manifest_file)) {
        console.log(
            chalk.red(`Development DLL file does not exist at ${dll_manifest_file}\nPlease build with:`),
            chalk.red.bold('npm run build:dll')
        );
        process.exit(99);
    }

    // If we want a DEBUG build (aka, deploy to npm-dev), then don't use DLLPlugin,
    //   and externalize all dependencies.
    if (isDebug) {
        config.externals = dependencies;
    } else {
        // Otherwise this is a local development build, and we want to utilize a DLL
        config.plugins.push(DLLPlugin);
    }
} else {
    // Production Modifications

    config.externals = dependencies;

    config.plugins.push(new UglifyEsPlugin({ mangle: true, compress: true }));
}

// If ran with SHOW_CONFIG_ONLY=1|true, only show the config and exit cleanly
if (showConfigOnly) {
    console.log(chalk.black.bgYellow.bold('Showing Configuration Only:'));
    console.log(require('util').inspect(config, false, null));
    process.exit(0);
}

module.exports = config;

