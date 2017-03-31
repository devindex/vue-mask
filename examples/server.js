const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();

const compiler = webpack(WebpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
});

const hotMiddleware = webpackHotMiddleware(compiler, {log: () => {}});

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'});
    cb();
  })
});

app.use(devMiddleware);
app.use(hotMiddleware);

app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}));

app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});
