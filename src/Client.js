import openSocket from 'socket.io-client';

class Client {
    static io = openSocket(process.env.SOCKET_URL + ":" + (process.env.PORT || process.env.SOCKET_DEFAULT_PORT));

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