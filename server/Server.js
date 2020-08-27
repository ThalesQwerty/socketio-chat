const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

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

        this.io.on("connection", (client) => {
            let user = this.newUser(client);

            client.on("message", function(data) {
                console.log(data);
                client.emit("test", {one: 1});
                client.broadcast.emit("message", data);
            });

            console.log("New client connected.");
        });
    }
    
    static newUser(client) {
        return {
            id: this.users.length > 0 ? 
                this.users[this.users.length - 1].id + 1 
                : 1,
            client: client
        };
    }
}

module.exports = Server;
