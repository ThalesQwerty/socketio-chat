import React from "react";
import { ThemeProvider } from '@material-ui/styles';

import Events from "./data/socket_io_events.json";

import THEME from "./styles/MaterialUITheme.js";
import STYLE from "./styles/App.module.scss";

import {
    User
} from "./classes";


import Client from "./Client.js";
import Chat from "./pages/Chat";

import "./styles/App.scss";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            users: []
        };

        Client.start(this, process.env.REACT_APP_SOCKET_URL || (window.location.protocol + "//" + window.location.hostname));
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
        }
        else {
            users.push(user);
        } 

        this.setState({users: users});
    }

    setUsers = (users) => {
        this.setState({users: users});
    }

    removeUser = (id) => {
        let users = this.state.users;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }

        this.setState({users: users});
    }

    render() {
        return (
            <>
                <ThemeProvider theme={THEME}>
                    <div className={STYLE.app_container}>
                        <Chat
                            messages={this.state.messages}
                            users={this.state.users}
                            functions={{
                                newMessage: this.newMessage,
                                sendMessage: this.sendMessage
                            }}
                        />
                    </div>
                </ThemeProvider>
            </>
        )
    }
}

export default App;