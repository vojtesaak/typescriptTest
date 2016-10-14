import {Printer} from '../lib/Printer';

const moment = require('moment-timezone');
const printer:Printer = new Printer();

setInterval(function() {
	printer.print("I AM ALIVE");
	printer.print(moment().format());
}, 5000);

