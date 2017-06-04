const webpack = require('webpack');
const { resolve } = require('path');

const src = resolve(__dirname, 'src');
const dist = resolve(__dirname, 'dist');
const publicPath = '/';

module.exports = {
    context: __dirname,
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: dist,
        filename: 'js/bundle.js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: src,
                enforce: 'pre',
                use: {
                    loader: 'eslint',
                    options: {
                        fix: true
                    }
                }
            },
            {
                test: /\.js$/,
                //exclude: /node_modules/,
                include: src,
                use: {
                    loader: 'babel'
                }
            }
        ]
    },
    devServer: {
        contentBase: __dirname,
        publicPath: publicPath
    },
    devtool: '#cheap-module-source-map',
    resolve: {

    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ]);
}

