import {Printer} from '../lib/Printer';
import {Worker} from "../lib/Messaging/Worker";
import {Producer} from "../lib/Messaging/Producer";
const moment = require('moment-timezone');
const printer:Printer = new Printer();

const worker = new Worker();
const producer = new Producer();

worker.addMessageListener(function(msg) {
	console.log("message arrived to worker", msg);
});
worker.connect();

producer.connect();

setInterval(function() {
	printer.print(moment().format());
	printer.print("Sending something to worker");

	producer.sendMessage(JSON.stringify({a: "b"}));
}, 5000);

