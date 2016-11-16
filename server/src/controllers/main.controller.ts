
import path = require('path');

const mainController = function(req, res) {
	const template = '/index.html';
	//res.sendFile('../../views/index.html', { root: __dirname });
	res.sendFile(template);
};


export = mainController;
