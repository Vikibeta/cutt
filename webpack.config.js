var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractResetCSS = new ExtractTextPlugin('css/reset.css');
var extractCommonCSS = new ExtractTextPlugin('css/common.css');
var extractSCSS = new ExtractTextPlugin('css/[name].bundle.css');

var config = require('./cutt.config.js');

module.exports = {
    entry: (function() {
        var obj = {'common': './src/js/common.js'};
        config.pages.forEach(function(i) {
            obj[i] = './src/js/' + i + '.js'
        });
        return obj;
    })(),
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
                    options: {name: 'img/[name].[ext]'}
                }]
            }
        ]
    },
    plugins: (function() {
        var arr = [extractResetCSS, extractSCSS, extractCommonCSS];
        config.pages.forEach(function(i) {
            arr.push(new htmlWebpackPlugin({
                template: 'src/' + i + '.html',
                filename:  i + '.html',
                chunks: ['common', i]
            }))
        });
        return arr;
    })(),
    devServer: {
        host: config.host || 'localhost',
        port: config.port || 8080
    }
};