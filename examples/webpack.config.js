const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const isProduction = () => process.env.WEBPACK_BUILD === 'production';

const config = {
  devtool: 'inline-source-map',
  entry: fs.readdirSync(__dirname).reduce(collectEntries, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.vue$/, loader: 'vue' }
    ]
  },

  resolve: {
    alias: {
      'vuex-module': path.resolve(__dirname, '../dist/vuex-module.min.js')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.NoErrorsPlugin()
  ]
};

if (isProduction()) {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    //NOTE: Use `#keep_fnames` in order to preserve action/getter/mutation names
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, keep_fnames: true },
      mangle: { keep_fnames: true }
    })
  );
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;

function collectEntries(entries, dir) {
  const fullDir = path.join(__dirname, dir);
  const entry = path.join(fullDir, 'app.js');
  if (!fs.statSync(fullDir).isDirectory() || !fs.existsSync(entry)) return entries;
  entries[dir] = [entry];
  if (!isProduction()) entries[dir].unshift('webpack-hot-middleware/client');
  return entries;
}
