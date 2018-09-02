const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    index: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
  	progress: true,
    open: true,
    noInfo: true,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
            	sourceMap: true,
            	singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: path.resolve(__dirname, 'dist/')
  }
}
