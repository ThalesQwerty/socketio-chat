class Server {
    static io = require("socket.io")();
    static port = null;

    static users = [];

    static start = (app) => {
        const server = require("http").createServer(app);
        this.io = require("socket.io").listen(server);
        this.port = process.env.PORT || 8080;

        server.listen(this.port);

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
