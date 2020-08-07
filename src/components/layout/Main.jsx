import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import MessageList from "../chat/MessageList";
import TextInput from "../chat/TextInput";

import STYLES from "./layout.module.scss";

import {
    Message,
    User
} from "../../classes/";

class Main extends React.Component {
    constructor(props) {
        super(props);

        const messages = [
            new Message("Hello there, how are you?")
                .align(Message.ALIGN_LEFT)
                .author(User.random())
        ];

        this.state = {
            messages: messages
        };
    }

    handleEnter = (e) => {
        if (e.keyCode == 13 && e.target.value.trim().length > 0) {
            this.newMessage(
                new Message(e.target.value.trim())
                    .align(Message.ALIGN_RIGHT)
                    .author(User.me())
            );

            this.mockAnswer();

            e.target.value = "";
        }
    }

    mockAnswer() {
        const answers = [
            "Ok",
            "Alright",
            "Yeah...",
            "That's cool!",
            "That's amazing!",
            "I'm listening"
        ];

        setTimeout(() => {
            const selected = answers[Math.floor(Math.random() * answers.length)];

            this.newMessage(
                new Message(selected)
                    .align(Message.ALIGN_LEFT)
                    .author(User.random())
            );

        }, Math.random() * 3000 + 2000);
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
            // <Grid item xl={10} lg={9} md={8} sm={7} xs={6} style={{ paddingTop: '2.5rem', paddingLeft: '0.5rem', paddingBottom: '3rem' }}>
            <Grid item className={STYLES.main}>
                <div>
                    <MessageList messages={this.state.messages} />
                    <TextInput onEnter={this.handleEnter} />
                </div>
            </Grid>
        );
    }
}

export default Main;