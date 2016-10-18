var zmq = require('zmq');

export class Producer {
    private socket:any = zmq.socket('push');

    public connect() {
        this.socket.bindSync('tcp://127.0.0.1:3000');
        console.log('Producer bound to port 3000');
    }

    public sendMessage(message:string) {
        this.socket.send(message);
    }
}