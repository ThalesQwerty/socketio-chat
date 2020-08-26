import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import MessageList from "../chat/MessageList";
import TextInput from "../chat/TextInput";

import STYLE from "./layout.module.scss";

import {
    Message,
    User
} from "../../classes/";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEnter = e => {
        if (e.keyCode == 13 && e.target.value.trim().length > 0) {
            this.props.functions.newMessage(
                new Message(e.target.value.trim())
                    .align(Message.ALIGN_RIGHT)
                    .author(User.me())
            );

            this.mockAnswer();

            e.target.value = "";
        }
    };

    mockAnswer = () => {
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

            this.props.functions.newMessage(
                new Message(selected)
                    .align(Message.ALIGN_LEFT)
                    .author(User.random())
            );

        }, Math.random() * 3000 + 2000);
    };

    render() {
        return (
            <Grid item className={STYLE.main}>
                <div>
                    <MessageList messages={this.props.messages} />
                    <TextInput onEnter={this.handleEnter} />
                </div>
            </Grid>
        );
    }
}

export default Main;