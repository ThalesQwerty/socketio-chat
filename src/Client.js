import openSocket from 'socket.io-client';

import Events from "./data/events.json";

class Client {
    static io = null;

    static send(event, data = null) {
        this.io.emit(event, data);
    }

    static start(app, url) {
        this.io = openSocket(url); 

        this.io.on(Events.SOCKET_IO_CONNECT, (data) => {
            console.log("OK");
            Client.send(Events.USER_CREATE);
        });

        this.io.on(Events.MESSAGE_CREATE, (data) => {
            app.receiveMessage(data);
        });

        this.io.on(Events.USER_CREATE, (data) => {
            app.addUser(data);
        })

        this.io.on(Events.USER_DELETE, (data) => {
            app.removeUser(data);
        })

        this.io.on(Events.USER_LIST, (data) => {
            app.setUsers(data);
        })
    }
}

export default Client