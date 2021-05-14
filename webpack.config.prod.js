//production build has only 3 file index.html, bundle.js, styles.css
//production process
//lint code, 
//bundle minify JS and Css, 
//generate Js and Css sourcemaps, Exclude dev concerns


//import webpack, 
//path (which comes with node allow us to work with path)
//HtmlWebPackPlugin which helps run application in browser and pointing the html entry point.
//MiniCssExtractPlugin will minify our css and extract it to separate file.


const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webPackBundleAnalyzer = require('webpack-bundle-analyzer');

//first let declare the node environment which helps plugins 
//to knows that we are in development mode.

process.env.NODE_ENV = 'production';

//to configure webpack we export js object
module.exports = {
    //this tell environment to run only in development
    //and disable some production only feature in webpack. 
    mode: 'production',

    //this tell webpack to work with browser, 
    //we can set this to 'node' if we are working with node
    target: 'web',

    //recommended for getting source-map for debugging.
    devtool: 'source-map',

    //entry point for webpack (default : './src/index')
    entry: "./src/index",

    //where we want webpack to output,
    //strange: because webpack doesn't output code in development mode
    //it serves our app from memory.
    //webpack requires this value so that our html can reference a bundle that has been serve from memory.
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/', // this specifies the public url of output directory when it reference in browser
        filename: 'bundle.js',
    },

    // plugins 
    plugins: [
        //Display bundle stats
        new webPackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

        //we want css minify outside
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        new webpack.DefinePlugin({
            //this global make sure React is built in prod mode.
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        //going to tell where to find our html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico',
            minify: {
                // see https://github.com/kangax/html-minifier#options-quick-reference
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],

    // tell webpack with file we want to use. add loaders
    // if more than one loaders then it works in bottom-up manner.
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    //cssnano for minify our css
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("cssnano")],
                            sourceMap: true
                        }
                    }

                ]
            },
        ]
    }
}


//things to note:
//webpack-dev-server by default run in watch mode.
