const path = require('path');
const webpack = require('webpack');

const distPath = path.join(__dirname, 'dist');

const { dependencies } = require('./package.json');

module.exports = {
    entry: Object.keys(dependencies),
    output: {
        path: distPath,
        pathinfo: true,
        filename: 'dependencies_dll.js',
        library: 'dependencies_dll',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'dependencies',
            path: path.join(distPath, 'dependencies_dll.json')
        })
    ],

    target: 'node'
};
