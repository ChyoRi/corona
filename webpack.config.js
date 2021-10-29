const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode : 'development',
  resolve: {
    extensions : ['.js', '.jsx']
  },
  entry : './src/index.js',
  output : {
    path: __dirname + '/bulid',
    filename: 'index.js',
  },
  module : {
    rules : [
      { test : /\.(js|jsx)$/, exclude: /node_modules/, use : ['babel-loader'] },
      { test : /\.(c|sa|cs)ss$/, use : ['style-loader', 'css-loader'] },
      { test : /\.html$/, use : ['html-loader'] },
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : './src/index.html',
      filename : 'index.html'
    })
  ],
  devServer : {
    open : true
  }
}