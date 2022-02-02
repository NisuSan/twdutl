const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

function createPluginManifest(buffer) {
  const manifest = JSON.parse(buffer.toString())
  
  delete manifest.devDependencies;
  manifest.scripts = {}

  return JSON.stringify(manifest, null, 2)
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    library: {
      type: 'commonjs2'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './package.json',
          to:   './package.json',
          transform (content) {
            return createPluginManifest(content)
          }
        },
        {
          from: './README.md',
          to:   './README.md',
        }
      ]
    })
  ]
}