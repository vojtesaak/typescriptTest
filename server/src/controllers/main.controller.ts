
import path = require('path');


const mainController = function(req, res) {

	const template = '/index.html';
	console.log('--------', template);
	//res.sendFile('../../views/index.html', { root: __dirname });
	res.sendFile(template);
};

module.exports = mainController;
