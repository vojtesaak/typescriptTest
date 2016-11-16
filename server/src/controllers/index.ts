
'use strict';

const express = require('express');
const router = express.Router();
const mainController = require('./main.controller');

router.get('/', mainController);

export = router;
