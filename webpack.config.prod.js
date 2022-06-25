const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const data = require('./src/data/price.json');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: './',
        filename: 'assets/js/[name].[contenthash:8].js',
        assetModuleFilename: "assets/images/[name][ext]",
    },

    entry: {
        index: './src/views/index.pug?myData=' + JSON.stringify(data),      // output index.html
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        // enable using Pug files in entry
        new CleanWebpackPlugin(),
        new PugPlugin({
            pretty: true,
            modules: [
                PugPlugin.extractCss({
                    filename: 'assets/css/[name].[contenthash:8].css'
                })
            ]
        }),

    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,

        port: 9000,
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader, // pug-plugin already contain the pug-loader
                options: {
                    method: 'render', // fast method to generate static HTML files
                }
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
};