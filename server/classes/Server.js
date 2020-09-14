const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const User = require("./User");

const Events = require("../../src/data/socket_io_events.json");
class Server {
    static io = socketIO();
    static port = 8080;

    static users = [];

    static startHTTP = () => {
        const port = process.env.PORT || this.port;
        const app = express();
        const server = http.createServer(app);

        const DIR = __dirname.replace(/\/server\/classes|\\server\\classes/, "");

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

            client.on(Events.USER_CREATE, function (data) {
                const room = data.room.length > 0 ? data.room : "main";
                client.join(room);

                const oldList = User.list.filter(user => user.room == room);
                let user = new User(client, data.user || {}, room);

                console.log(user);
                // console.log(user.name + " connected on " + data.room);

                client.on(Events.MESSAGE_CREATE, function (data) {

                    let message = user.assignMessage(data);
                    console.log(message);
                    client.to(room).emit(Events.MESSAGE_CREATE, message);

                });

                client.on(Events.SOCKET_IO_DISCONNECT, function (data) {

                    client.to(room).emit(Events.USER_DELETE, user.id);
                    User.remove(user.id);

                });

                client.emit(Events.USER_LIST, oldList);
                client.emit(Events.USER_CREATE, user.me());

                client.to(room).emit(Events.USER_CREATE, user.public());

            });

        });
    }
}

module.exports = Server;
