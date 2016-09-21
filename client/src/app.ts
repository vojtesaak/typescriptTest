

import {Component, Type} from '@angular/core';
const io = require('socket.io-client');

@Component({
  	selector: 'app',
  	template: `
		<h1>HELLO WORLD</h1>
		
  		<input type="text" [(ngModel)]="message">
  		<button (click)="addMessage()"> Add message</button>

  	  	<div *ngFor="let message of messages">{{message}}</div>
  	`
})



export class App extends Type {

	private url = 'http://localhost:3000';

	private socket;

	messages: string[] = [];
	message = '';

	test = null;

	price: number = 0.0;

	bidValue = '';

	constructor(){
		super();
		this.socket = io(this.url);
		this.socket.on('updateMessage',(message)=> {
			this.messages = message;
		});
	}


	addMessage(){
		this.socket.emit('message', this.message);
		this.message = '';
	}
}

