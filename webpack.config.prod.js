var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'production',
  entry: [ 
    __dirname + "/src/index.js"
  ],
  output: {
    path:  __dirname + "/build",
    filename: "bundle.js",
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['react-hot-loader/babel', 'transform-class-properties']
        }
      }, {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'}
      ]}, {
      exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
      loader: 'file-loader',
      options: {
        name: 'static/meda/[name].[ext]'
      }
     }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + "/public/index.html", minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttirbute: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ManifestPlugin({
      filename: 'asset-manifest.json'
    })
  ]
};
