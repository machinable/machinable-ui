/* config-overrides.js */

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  var monacoPlugin = new MonacoWebpackPlugin({
    // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    languages: ['json']
  });

  var plugins = config.plugins;
  plugins.unshift(monacoPlugin);

  config.plugins = plugins;

  return config;
}