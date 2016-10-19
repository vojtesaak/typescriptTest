const zmq = require('zmq');
const _ = require('lodash');

export class Worker {
    private socket:any = zmq.socket('pull');
    private listeners:Array<Function> = [];

    public connect() {
        this.socket.on('message', (msg) => {
            console.log("Message arrived");
            _.forEach(this.listeners, (listener) => listener(JSON.stringify(msg)));
        });

        this.socket.connect('tcp://127.0.0.1:3000');
        console.log('Worker connected to port 3000');
    }

    public addMessageListener(listener:Function) {
        this.listeners.push(listener);
    }
}