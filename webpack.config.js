var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractResetCSS = new ExtractTextPlugin('css/reset.css');
var extractCommonCSS = new ExtractTextPlugin('css/common.css');
var extractSCSS = new ExtractTextPlugin('css/[name].bundle.css');

module.exports = {
    entry: {
        'common': './src/js/common.js',
        'index': './src/js/index.js',
        'about': './src/js/about.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: extractResetCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract(['css-loader', 'sass-loader']),
                exclude: [
                    path.resolve(__dirname, "src/scss/common.scss")
                ]
            },
            {
                test: /common.scss$/,
                use: extractCommonCSS.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {name: '[name].[ext]'}
                }]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['common', 'index']
        }),
        new htmlWebpackPlugin({
            template: 'src/about.html',
            filename: 'about.html',
            chunks: ['common', 'about']
        }),
        extractResetCSS,
        extractSCSS,
        extractCommonCSS
    ]
};