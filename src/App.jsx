import React from "react";
import { ThemeProvider } from '@material-ui/styles';

import THEME from "./styles/MaterialUITheme.js";
import STYLE from "./styles/App.module.scss";

import {
    Message,
    User
} from "./classes";


import Client from "./Client.js";
import Chat from "./pages/Chat";

import "./styles/App.scss";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        Client.subscribe(this, window.location.protocol + "//" + window.location.hostname);
    }

    sendMessage = (message, callback = () => { }) => {
        Client.send("message", message);
        this.newMessage(message, callback);
    }

    receiveMessage = (message) => {
        this.newMessage(
            new Message(message.content)
                .align(Message.ALIGN_LEFT)
                .author(User.random())
        );
    }

    newMessage = (message, callback = () => { }) => {
        let newArray = this.state.messages.slice(0);
        newArray.push(message);

        this.setState({
            messages: newArray
        }, callback);
    }

    render() {
        return (
            <>
                <ThemeProvider theme={THEME}>
                    <div className={STYLE.app_container}>
                        <Chat
                            messages={this.state.messages}
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