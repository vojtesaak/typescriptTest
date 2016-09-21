
'use strict';

import path = require('path');
import config from './config';

const express = require('express');
const io = require('socket.io')();
const app = express();

const webServer = require('./bin/webServer');
const controllers = require('./controllers');


const DIST_PATH = path.join(process.cwd(), 'dist/public');
const ASSETS_PATH = path.join(process.cwd(), 'client/assets');
const ROOT = path.join(__dirname, '../../');

app.io = io;

app.set('host', config.host || '0.0.0.0');
app.set('port', config.port || 3000);

app.set('views', './views');

app.use('/dist', express.static(DIST_PATH));
app.use('/assets', express.static(ASSETS_PATH));

app.use(controllers);




webServer.pre(function(server) {

	io.attach(server);

	const messages: string[] = [];

	io.on('connection', function(socket) {

		socket.emit('updateMessage',messages);

		socket.on('message', function(message){
			messages.push(new Date() + '  ' + message);
			console.log(messages);
			socket.emit('updateMessage', messages);
			socket.broadcast.emit('updateMessage',messages);
		});
	});

});

webServer.after(function() {

	if (config.env === 'development') {

		const webpack = require('webpack');
		const webpackConfig = require(path.join(ROOT, 'webpack.config.client.js'));
		const webpackDevMiddleware = require('webpack-dev-middleware');
		const compiler = webpack(webpackConfig);


		app.use(webpackDevMiddleware(compiler, {}));


	}

});

webServer.run(app);




