
'use strict';

import path = require('path');


const mainController = function(req, res) {
	res.sendFile(path.join(process.cwd(), '/server/views', 'index.html'))
};

module.exports = mainController;
