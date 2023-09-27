const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/fe-index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.s?css/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader',
                    // { loader: 'css-loader', options: { importLoaders: 1 } },
                    // 'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './public/index.html'
        }),
    ],
    devServer: {
        port: 5000,
        static: {
            directory: path.join(__dirname, 'public')
        },
        historyApiFallback: true,
        proxy: {
            '/': 'http://localhost:3000'
        },
    },
}