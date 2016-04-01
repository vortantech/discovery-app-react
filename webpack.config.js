var path = require('path')
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
}
