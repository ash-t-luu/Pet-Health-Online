const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        src: './client/fe-index.js'
    },
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.s?css/i,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html'
        }),
    ],
    // devServer: {
    //     static: {
    //         publicPath: '/dist',
    //         directory: path.resolve(__dirname, 'build')
    //     },
    // },
}