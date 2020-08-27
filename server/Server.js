class Server {
    static io = require("socket.io")();
    static port = 8080;

    static users = [];

    static start = () => {
        this.io.listen(this.port);
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
