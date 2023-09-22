const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        src: './client/fe-index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
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
                test: /\.s?css/,
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
    devServer: {
        static: {
            publicPath: '/dist',
            directory: path.resolve(__dirname, 'dist')
        },
    },
}