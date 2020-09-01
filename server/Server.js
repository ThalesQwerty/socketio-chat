const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const User = require("./User");

const Events = require("../src/events.json");

class Server {
    static io = socketIO();
    static port = 8080;

    static users = [];

    static startHTTP = () => {
        const port = process.env.PORT || this.port;
        const app = express();
        const server = http.createServer(app);

        const DIR = __dirname.replace(/\/server|\\server/, "");
        console.log("Build path: " + DIR);

        server.listen(port);
        this.port = port;

        console.log("HTTP listening on " + this.port);
        app.use(express.static(path.join(DIR, 'build')));

        app.get('/ping', function (req, res) {
        return res.send('pong');
        });

        app.get('/*', function (req, res) {
        res.sendFile(path.join(DIR, 'build', 'index.html'));
        });

        return server;
    }

    static startWebsocket = (server = null) => {
        if (server == null) {
            const port = process.env.PORT || this.port;
            const app = express();

            server = http.createServer(app);
            server.listen(port);
        }

        this.io = require("socket.io").listen(server);
        this.io.set('origins', '*:*');

        console.log("SocketIO listening on " + this.port);

        this.io.on(Events.SOCKET_IO_CONNECT, (client) => {
            const oldList = User.list.map((x) => x);
            let user = new User(client);

            client.on(Events.MESSAGE_NEW, function(data) {
                console.log(data);
                client.broadcast.emit(Events.MESSAGE_NEW, data);
            });

            client.on(Events.SOCKET_IO_DISCONNECT, function(data) {
                client.broadcast.emit(Events.USER_LEFT_CHAT, user.id);
                User.remove(user.id);
            });

            client.emit(Events.INFO_USER_LIST, oldList);
            client.emit(Events.INFO_ME, user.me());

            console.log(oldList);

            client.broadcast.emit(Events.USER_JOINED_CHAT, user.public());
        });
    }
}

module.exports = Server;
