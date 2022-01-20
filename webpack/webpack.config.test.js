const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  entry: './test/src/main.js',
  output: {
    path: path.join(__dirname, './test/dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'test/src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'test/src'),
    },
    compress: true,
    port: 9000,
  },
}