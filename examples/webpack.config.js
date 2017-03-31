const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {

  devtool: 'inline-source-map',

  entry: {
    app: ['./main.js', 'webpack-hot-middleware/client']
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.common.js',
      'di-vue-mask': path.join(__dirname, '..', 'src')
    }
  },

  // Expose __dirname to allow automatically setting basename.
  context: __dirname,
  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      filename: 'shared.js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

};
