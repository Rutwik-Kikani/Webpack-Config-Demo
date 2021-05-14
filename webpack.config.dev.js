//import webpack, 
//path (which comes with node allow us to work with path)
//HtmlWebPackPlugin which helps run application in browser and pointing the html entry point.

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//first let declare the node environment which helps plugins 
//to knows that we are in development mode.

process.env.NODE_ENV = 'development';

//to configure webpack we export js object
module.exports = {
    //this tell environment to run only in development
    //and disable some production only feature in webpack. 
    mode: 'development',

    //this tell webpack to work with browser, 
    //we can set this to 'node' if we are working with node
    target: 'web',

    //recommended for getting source-map for debugging.
    devtool: 'cheap-module-source-map',

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

    //now will config devServer
    devServer: {
        //this reduces the information that it writes to the cli
        stats: 'minimal',
        //this tell it's to overlay any error that occur in browser
        overlay: true,
        //this means all requests will be sent to index.html
        historyApiFallback: true,
    },
    // plugins 
    plugins: [
        //going to tell where to find our html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico'
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
                use: ["style-loader", "css-loader"]
            },
        ]
    }
}


//things to note:
//webpack-dev-server by default run in watch mode.
