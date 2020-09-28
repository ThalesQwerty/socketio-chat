const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const User = require("./User");
const Room = require("./Room");

const Events = require("../../src/data/socket_io_events.json");
const MessageType = require("../../src/data/message_types.json");
class Server {
    static io = socketIO();
    static port = 8080;

    static users = [];

    static startHTTP = () => {
        const port = process.env.PORT || this.port;
        const app = express();
        const server = http.createServer(app);

        const DIR = __dirname.replace(/\/server\/classes|\\server\\classes/, "");

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

        const io = this.io;

        this.io.on(Events.SOCKET_IO_CONNECT, (client) => {

            client.on(Events.ROOM_SELECT, function (data) {
                const room = Room.find(data.id);

                let error = room ? null : "Room not found.";

                client.emit(Events.ROOM_SELECT, {
                    error: error,
                    room: error ? null : room.id,
                });
            });

            client.on(Events.ROOM_CREATE, function (data) {
                let room = Room.find(data.id);

                if (!room) {
                    room = new Room(data.id, data.user);
                    client.emit(Events.ROOM_CREATE, {room: room.id});
                }
                else {
                    client.emit(Events.ROOM_CREATE, {error: "A room with this name already exists!"});
                }
            });

            client.on(Events.USER_CREATE, function (data) {
                const room = Room.find(
                    data.room.length > 0 ? data.room : "main"
                );

                if (room) {
                    client.join(room.id);

                    User.remove(client.id);

                    const oldList = User.list.filter(user => user.room.id == room.id);
                    let user = new User(client, data.user || {}, room, data.cookie);

                    if (room.gate(user)) {

                        console.log(user);

                        if (user.owner) {
                            client.emit(Events.MESSAGE_CREATE, {
                                content: "You've created the room \"" + room.id + "\"! Copy the URL of this page to invite your friends!",
                                type: MessageType.EVENT
                            });
                        }

                        if (room.owner && room.owner.cookie == user.cookie && !User.find(room.owner.id)) {
                            user.owner = true;
                            room.owner = user;
                        }
                        
                        client.on(Events.USER_DELETE, function (data) {
                            const target = User.find(data.id);

                            if (target) {
                                if (user.owner && user.room.id == target.room.id) {

                                    target.kicked = true;
                                    const targetClient = io.sockets.connected[target.id];

                                    const room = Room.find(user.room.id);

                                    if (room && target.cookie !== user.cookie) {
                                        room.blackList.push(target.cookie);
                                    }

                                    targetClient.to(room.id).emit(Events.MESSAGE_CREATE, {
                                        content: target.name + " has been removed by " + user.name,
                                        type: MessageType.EVENT
                                    });

                                    targetClient.emit(Events.USER_DELETE, {
                                        user: target.public(),
                                        message: "You've been kicked out by " + user.name + ", the room owner."
                                    });
                                    
                                    targetClient.disconnect();
                                }
                            }
                        });

                        client.on(Events.MESSAGE_CREATE, function (data) {

                            let message = user.assignMessage(data);
                            console.log(message);
                            client.to(room.id).emit(Events.MESSAGE_CREATE, message);

                        });

                        client.on(Events.SOCKET_IO_DISCONNECT, function (data) {
                            const currentUser = User.find(user.id);

                            if (currentUser) {
                                client.to(room.id).emit(Events.USER_DELETE, {
                                    user: currentUser.public(),
                                    message: currentUser.kicked ? null : currentUser.name + " has left the room"
                                });
                                User.remove(user.id);
                            }
                        });

                        client.emit(Events.USER_LIST, oldList);
                        client.emit(Events.USER_CREATE, {user: user.me()});

                        client.to(room.id).emit(Events.USER_CREATE, {user: user.public()});
                    }
                    else {
                        User.remove(client.id);
                        client.leave(room.id);
                        client.emit(Events.USER_CREATE, {
                            error: "You can't join this room anymore because you've been kicked out."
                        });
                    }
                }
                else {
                    client.leave(room.id);
                    client.emit(Events.USER_CREATE, {
                        error: "Room not found."
                    });
                }

            });

        });
    }
}

module.exports = Server;
