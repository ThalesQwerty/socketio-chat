import React from "react";
import { ThemeProvider } from '@material-ui/styles';

import Events from "./data/socket_io_events.json";
import Page from "./data/pages.json";

import THEME from "./styles/MaterialUITheme.js";
import STYLE from "./styles/App.module.scss";

import {
    User,
    Message
} from "./classes";

import {
    If
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

        this.state = {
            currentPage: Page.LOGIN,
            room: unescape(window.location.hash.substring(1) || window.location.pathname.substring(1)),
            messages: [],
            users: []
        };

        Client.start(this, process.env.REACT_APP_SOCKET_URL || (window.location.protocol + "//" + window.location.hostname));
    }

    login = (data) => {
        if (data.room) {
            this.setState({room: data.room});
            window.location.hash = "#" + Room(data.room);
        }

        this.setState({
            users: [],
            messages: []
        });
        
        Client.send(Events.USER_CREATE, { user: data.user, room: data.room || Room(this.state.room) });
    }

    sendMessage = (message, callback = () => { }) => {
        Client.send(Events.MESSAGE_CREATE, message);
        this.newMessage(message, callback);
    }

    receiveMessage = (message) => {
        this.newMessage(message);
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
                            />
                        </If>
                        <If condition={this.state.currentPage == Page.NEW_ROOM}>
                            <Login
                                createRoom={true}
                                user={User.me}
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