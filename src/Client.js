import openSocket from 'socket.io-client';

class Client {
    static io = null;

    static send(event, data) {
        this.io.emit(event, data);
    }

    static subscribe(app, url) {
        this.io = openSocket(url); 
        this.io.on("message", (data) => {
            app.receiveMessage(data);
        });
    }
}

export default Client