import openSocket from 'socket.io-client';

class Client {
    static io = openSocket('http://localhost:8080');

    static send(event, data) {
        this.io.emit(event, data);
    }

    static subscribe(app) {
        this.io.on("message", (data) => {
            app.receiveMessage(data);
        });
    }
}

export default Client