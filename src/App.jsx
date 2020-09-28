import React from "react";
import { ThemeProvider } from '@material-ui/styles';

import Cookies from 'universal-cookie';

import Events from "./data/socket_io_events.json";
import Page from "./data/pages.json";

import THEME from "./styles/MaterialUITheme.js";
import STYLE from "./styles/App.module.scss";

import {
    User,
    Message
} from "./classes";

import {
    If,
    RandomString
} from "./utils";

import Client from "./Client.js";
import Room from "./utils/MainRoom";

import {
    Chat,
    Login
} from "./pages";

import "./styles/App.scss";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();

        if (!this.cookies.get('id')) {
            this.cookies.set('id', new RandomString(32), { path: '/' });
        }

        this.state = {
            currentPage: Page.LOADING,
            errorMessage: "",
            room: unescape(window.location.hash.substring(1) || window.location.pathname.substring(1)),
            messages: [],
            users: []
        };

        Client.start(process.env.REACT_APP_SOCKET_URL || (window.location.protocol + "//" + window.location.hostname));
        
        Client.events([
            [Events.SOCKET_IO_CONNECT, () => setTimeout(() => Client.send(Events.ROOM_SELECT, {id: Room(this.state.room)}), 500)],
                
            [Events.MESSAGE_CREATE, this.receiveMessage],

            [Events.USER_CREATE, this.addUser],
            [Events.USER_DELETE, this.removeUser],
            [Events.USER_LIST, this.setUsers],

            [Events.ROOM_SELECT, this.getRoom]
        ]);
    }

    login = (data) => {
        if (data.room) {
            this.setState({room: data.room});
            window.location.hash = "#" + Room(data.room);
            Client.send(Events.ROOM_CREATE, { user: data.user, id: data.room }, (resp) => {
                if (resp) {
                    Client.send(Events.USER_CREATE, { user: data.user, room: resp || Room(this.state.room), cookie: this.cookies.get('id') });
                } else {
                    this.setState({
                        errorMessage: "A room with this name already exists."
                    });
                }
            });
        }
        else {
            Client.send(Events.USER_CREATE, { user: data.user, room: data.room || Room(this.state.room), cookie: this.cookies.get('id') });
        }

        this.setState({
            users: [],
            messages: []
        });
    }

    sendMessage = (message, callback = () => { }) => {
        Client.send(Events.MESSAGE_CREATE, message.content);
        this.newMessage(message, callback);
    }

    receiveMessage = (message) => {
        this.newMessage(
            new Message(message.content)
                .setType(message.type || Message.TYPE_MESSAGE)
                .align(Message.ALIGN_LEFT)
                .author(message.author)
        );
    }

    newMessage = (message, callback = () => { }) => {
        let newArray = this.state.messages.slice(0);
        newArray.push(message);

        this.setState({
            messages: newArray
        }, callback);
    }

    addUser = (user) => {
        let users = this.state.users;

        if (user.me) {
            User.me = user;
            users.unshift(user);
            this.setState({ currentPage: Page.CHAT });
        }
        else {
            if (User.me.owner) user.kickable = true;
            users.push(user);

            this.newMessage(
                new Message(user.name + " has joined the room", Message.TYPE_EVENT)
            );
        }

        this.setState({ users: users });
    }

    setUsers = (users) => {
        this.setState({ users: users });
    }

    removeUser = (id) => {
        let users = this.state.users;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
                this.newMessage(
                    new Message(user.name + " has left the room", Message.TYPE_EVENT)
                );
                users.splice(i, 1);
                break;
            }
        }

        this.setState({ users: users });
    }

    createRoom = () => {
        this.setState({currentPage: Page.NEW_ROOM})
    }

    cancelCreateRoom = () => {
        this.setState({ currentPage: Page.CHAT });
    }

    getRoom = (data) => {
        this.setState({ 
            currentPage: data.roomExists ? Page.LOGIN : Page.ERROR,
            errorMessage: data.roomExists ? "" : "Room not found."
        })
    }

    render() {
        return (
            <>
                <ThemeProvider theme={THEME}>
                    <div className={STYLE.app_container}>
                        <If condition={this.state.currentPage == Page.LOGIN}>
                            <Login
                                room={this.state.room}
                                functions={{
                                    login: this.login
                                }}
                                showInput={true}
                            />
                        </If>
                        <If condition={this.state.currentPage == Page.NEW_ROOM}>
                            <Login
                                createRoom={true}
                                buttonText="Cancel"
                                showInput={true}
                                subText={this.state.errorMessage}
                                user={User.me}
                                functions={{
                                    login: this.login,
                                    cancelCreateRoom: this.cancelCreateRoom
                                }}
                            />
                        </If>
                        <If condition={this.state.currentPage == Page.ERROR}>
                            <Login
                                createRoom={true}
                                error={this.state.errorMessage}
                                showInput={false}
                                functions={{
                                    login: this.login,
                                    cancelCreateRoom: this.cancelCreateRoom
                                }}
                            />
                        </If>
                        <If condition={this.state.currentPage == Page.CHAT}>
                            <Chat
                                room={this.state.room}
                                messages={this.state.messages}
                                users={this.state.users}
                                functions={{
                                    newMessage: this.newMessage,
                                    sendMessage: this.sendMessage,
                                    createRoom: this.createRoom,
                                }}
                            />
                        </If>
                    </div>
                </ThemeProvider>
            </>
        )
    }
}

export default App;