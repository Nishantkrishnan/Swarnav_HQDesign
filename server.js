const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('./webpack/webpack.dev.config.js');

let api;
const PORT = (process.env.PORT || 8080);
const API_HOST = process.env.API_HOST;
const API_PORT = process.env.API_PORT;
const MODULE_NAME = (process.env.MODULE_NAME || 'Default');
const FRONTEND = (process.env.FRONTEND || 'http://localhost');

const config = getConfig(MODULE_NAME, PORT);
console.log('APIHOST::::::::',API_HOST,'APIPORT::::::::::',API_PORT)
if (API_PORT) { api = `http://${API_HOST}:${API_PORT}`; } else { api = `http://${API_HOST}`; }

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  hotOnly: true,
  noInfo: false,
  stats: 'minimal',
  inline: true,
  disableHostCheck: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  proxy: {
    '/api/v1/*': {
      target: api,
      secure: false,
      changeOrigin: false
    },
  },
}).listen(PORT, '0.0.0.0', (err) => {
  if (err) console.error(err);
  console.info(`Starting ${MODULE_NAME}. ${FRONTEND}:${PORT}`);
  console.info(api);
});
