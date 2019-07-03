const _ = require('lodash');
const webpack = require('webpack');

const packageJSON = require('../package.json');

module.exports = (entry, output) => {
  return _.merge({}, require('./webpack.dev')(entry, output), {
    mode: 'production',
    output: {
      filename: output
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.BannerPlugin(
        `formiojs-gp v${packageJSON.version} | https://unpkg.com/formiojs-gp@${packageJSON.version}/LICENSE.txt`
      )
    ]
  });
};
