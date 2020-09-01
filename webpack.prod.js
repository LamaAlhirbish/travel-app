const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const dotenv = require('dotenv')
dotenv.config()
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                // JS loader
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                // SASS loader
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
           },
           {
               // Image loader
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new webpack.DefinePlugin({
            'process.env.geonamesURL' : JSON.stringify(process.env.geonamesURL),
            'process.env.geonamesKey' : JSON.stringify(process.env.geonamesKey),
            'process.env.WeatherbitAPI' : JSON.stringify(process.env.WeatherbitAPI),
            'process.env.weatherbitKey' : JSON.stringify(process.env.weatherbitKey),
            'process.env.pixabayURL' : JSON.stringify(process.env.pixabayURL),
            'process.env.pixabayKey' : JSON.stringify(process.env.pixabayKey)
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}
