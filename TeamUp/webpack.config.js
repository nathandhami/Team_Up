const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/config/authConfig.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      files: ['./views/placeholders/*.pug', './views/*.pug'],
      proxy: 'http://localhost:8090/',
      // server: {
      //   baseDir: ['public/*.html', 'views/*/*.pug']
      // }
    }),
  ],
};
