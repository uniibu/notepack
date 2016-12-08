
var webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  output: {
    library: 'notepack',
    libraryTarget: 'umd',
    path: './dist',
    filename: 'notepack.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
};
