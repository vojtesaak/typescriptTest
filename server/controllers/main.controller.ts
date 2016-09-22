
import path = require('path');


const mainController = function(req, res) {
	console.log('--------', path.join('../views/index.html'));
	res.sendFile('../views/index.html', { root: __dirname });
};

module.exports = mainController;
