var io = require("socket.io")();

const port = 8080;

io.listen(port);
io.set('origins', '*:*');

console.log("SocketIO listening on " + port);

io.on("connection", (client) => {
    let user = newUser(client);

    client.on("message", function(data) {
        console.log(data);
        client.emit("test", {one: 1});
        client.broadcast.emit("message", data);
    });

    console.log("New client connected.");
});

var users = [];

function newUser(client) {
    return {
        id: users.length > 0 ? 
            users[users.length - 1].id + 1 
            : 1,
        client: client
    };
}