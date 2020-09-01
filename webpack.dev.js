// const path = require("path")
// const webpack = require("webpack")
// const HtmlWebPackPlugin = require("html-webpack-plugin")
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const dotenv = require('dotenv')
// dotenv.config()

// module.exports = {
//     entry: './src/client/index.js',
//     mode: 'development',
//     devtool: 'source-map',
//     stats: 'verbose',
//     output: {
//         libraryTarget: 'var',
//         library: 'Client'
//     },
//     module: {
//         rules: [
//             {
//                 // JS loader
//                 test: '/\.js$/',
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             },
//             {
//                 // SASS loader
//                 test: /\.scss$/,
//                 use: [ 'style-loader', 'css-loader', 'sass-loader' ]
//            },
//            {
//                // Image loader
//                 test: /\.(png|svg|jpg|gif|jpe?g)$/,
//                 use: [ 'file-loader' ]
//             }       
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: "./src/client/views/index.html",
//             filename: "./index.html",
//         }),
//         new CleanWebpackPlugin({
//             // Simulate the removal of files
//             dry: true,
//             // Write Logs to Console
//             verbose: true,
//             // Automatically remove all unused webpack assets on rebuild
//             cleanStaleWebpackAssets: true,
//             protectWebpackAssets: false
//         }),
//         new webpack.DefinePlugin({
//             'process.env.geonamesURL' : JSON.stringify(process.env.geonamesURL),
//             'process.env.geonamesKey' : JSON.stringify(process.env.geonamesKey),
//             'process.env.WeatherbitAPI' : JSON.stringify(process.env.WeatherbitAPI),
//             'process.env.weatherbitKey' : JSON.stringify(process.env.weatherbitKey),
//             'process.env.pixabayURL' : JSON.stringify(process.env.pixabayURL),
//             'process.env.pixabayKey' : JSON.stringify(process.env.pixabayKey)
//         })
//     ]
// }
