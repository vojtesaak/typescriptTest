#!/usr/bin/env node
'use strict';

const http = require('http');
import config from '../config';

/**
 * @param  {*} val input
 * @return {number|string}
 */
function normalizePort (val) {
    const parsedPort = parseInt(val, 10);

    if (isNaN(parsedPort)) {
        // named pipe
        return val;
    }

    if (parsedPort >= 0) {
        // port number
        return parsedPort;
    }

    return false;
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(server, cb) {
    return function onListen () {
        const addr = server.address();
        const host = addr.address || '';
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : host + ':' + addr.port;
        console.log('Listening on ' + bind);

        if (cb) {
            cb();
        }
    };
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(port, host) {

    return function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const address = host + ':' +  port;

        switch (error.code) {
            case 'EACCES':
                console.error(address + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(port + ' is already in use');
                process.exit(1);
                break;
            case 'EADDRNOTAVAIL':
                console.log(error);
                console.error(address + ' is not available');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}




const webServer =  {

	_preCallback: null,

	_afterCallback: null,

	_addCallback: function(property, cb) {
		if (cb && typeof cb !== 'function') {
			throw Error('Arguemnt must be function!');
		}

		this[property] = cb;
	},


	pre: function(cb) {
		return this._addCallback('_preCallback', cb);
	},

	after: function (cb) {
		return this._addCallback('_afterCallback', cb);
	},

	run: function(app) {

		const port = normalizePort(app.get('port'));
		const host = app.get('host');
		const server = http.createServer(app);

		if (this._preCallback) {
			this._preCallback(server);
		}

		server.listen(port, host);
		server.on('error', onError(port, host));
		server.on('listening', onListening(server, this._afterCallback));
	}

};

module.exports = webServer;
