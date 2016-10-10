process.env.NODE_ENV = 'development';

import path = require('path');
import config from './config';
import * as webpackDevServer from './webpack.dev.server';

const express = require('express');
const io = require('socket.io')();
const app = express();

const webServer = require('./bin/webServer');
const controllers = require('./controllers');

const ROOT = process.cwd();

app.io = io;

app.set('host', config.host || '127.0.0.1');
app.set('port', config.port || 3000);

app.use('/bundles', express.static(path.join(ROOT, 'client/dist')));
app.use(express.static(path.join(ROOT, 'client/public')));
app.use(express.static(path.join(ROOT, 'server/views')));

app.use(controllers);

webServer.pre(server => {

	const messages: string[] = [];

	io.attach(server);

	io.on('connection', function(socket) {
		socket.emit('updateMessage',messages);
		socket.on('message', function(message){
			messages.push(new Date() + '  ' + message);
			socket.emit('updateMessage', messages);
			socket.broadcast.emit('updateMessage',messages);
		});
	});

});


webServer.after(()=> {
	webpackDevServer.init();
});



webServer.run(app);





