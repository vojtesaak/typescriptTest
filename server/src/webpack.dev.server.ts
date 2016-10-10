
import config from './config';

//https://github.com/webpack/docs/wiki/webpack-dev-server#api

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.client.config');


function init() {

	webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:${config.devServerPort}/`, 'webpack/hot/dev-server');

	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, config.devServerConfig);

	server.listen(config.devServerPort, 'localhost', () => {
		console.log(`devServer listening on port: ${config.devServerPort}` );
	});
}


export { init };
