import openSocket from 'socket.io-client';

import Events from "./data/socket_io_events.json";

class Client {
    static io = null;

    static send(event, data = null, onResponse = null) {
        this.io.emit(event, data);

        if (onResponse) {
            const callback = (data) => {
                onResponse(data);
                this.io.off(event, callback);
            };

            this.io.on(event, callback);
        }
    }

    static events(events) {
        for (const pair of events) {
            const name = pair[0];
            const fn = pair[1];

            this.io.on(name, (data) => fn(data));
        }
    }

    static start(url) {
        this.io = openSocket(url);
    }
}

export default Client