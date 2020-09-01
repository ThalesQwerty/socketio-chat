import openSocket from 'socket.io-client';

import Events from "./events.json";

class Client {
    static io = null;

    static send(event, data = null) {
        this.io.emit(event, data);
    }

    static start(app, url) {
        this.io = openSocket(url); 

        this.io.on(Events.SOCKET_IO_CONNECT, (data) => {
            console.log("OK");
            Client.send(Events.GET_INFO);
        });

        this.io.on(Events.MESSAGE_NEW, (data) => {
            app.receiveMessage(data);
        });

        this.io.on(Events.USER_JOINED_CHAT, (data) => {
            app.addUser(data);
        })

        this.io.on(Events.USER_LEFT_CHAT, (data) => {
            app.removeUser(data);
        })

        this.io.on(Events.INFO_ME, (data) => {
            app.addUser(data, true);
        })

        this.io.on(Events.INFO_USER_LIST, (data) => {
            app.setUsers(data);
        })
    }
}

export default Client