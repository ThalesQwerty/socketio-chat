import openSocket from 'socket.io-client';

import Events from "./data/socket_io_events.json";

class Client {
    static io = null;

    static send(event, data = null) {
        this.io.emit(event, data);
    }

    static start(url, events) {
        this.io = openSocket(url); 

        for (const pair of events) {
            const name = pair[0];
            const fn = pair[1];

            this.io.on(name, (data) => fn(data));
        }
    }
}

export default Client