// import * as webpack from 'webpack';
const path = require('path');
const fs = require('fs');

const getAllNodeModules = () => {
    var nodeModules = {};

    fs.readdirSync('node_modules')
        .filter((x) =>
            ['.bin'].indexOf(x) === -1
        )
        .forEach((mod) =>
            nodeModules[mod] = 'commonjs ' + mod);

    return nodeModules;
};

// : webpack.Configuration 
const config = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + 'dist'
    },
    devtool: 'source-map',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: "source-map-loader"
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        modules: [
            path.join(__dirname, './src'),
            'node_modules'
        ]
    },
    externals: {
        "fs": {
            commonjs: "fs"
        }
    }
    // node: {
    //     fs: true
    // }
    // node: {
    //     dns: "mock",
    //     fs: "empty",
    //     path: true,
    //     url: false
    // }
};

module.exports = config;

// export default ;

