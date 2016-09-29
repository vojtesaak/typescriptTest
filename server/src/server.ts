

import path = require('path');
import config from './config';

const express = require('express');
const io = require('socket.io')();
const app = express();

const webServer = require('./bin/webServer');
const controllers = require('./controllers');
const webpackClientConfig = require('../../webpack.client.config.js');

const ROOT = process.cwd();

app.io = io;

app.set('host', config.host || '127.0.0.1');
app.set('port', config.port || 3000);

app.use('/bundles', express.static(path.join(ROOT, 'client/dist')));
app.use(express.static(path.join(ROOT, 'client/public')));
app.use(express.static(path.join(ROOT, 'server/views')));

app.use(controllers);


webServer.pre(server => {

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


webServer.after(()=> {

	if (config.env === 'development') {
		const webpack = require('webpack');
		const webpackDevMiddleware = require('webpack-dev-middleware');
		const compiler = webpack(webpackClientConfig);
		app.use(webpackDevMiddleware(compiler, {}));
	}

});

webServer.run(app);




