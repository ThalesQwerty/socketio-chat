import React from "react";

import {
    Grid,
} from "@material-ui/core";

import MessageList from "../chat/MessageList";
import TextInput from "../chat/TextInput";

import STYLE from "./layout.module.scss";

import {
    Message,
    User
} from "../../classes/";

function Main (props) {

    const handleEnter = e => {
        if (e.keyCode === 13 && e.target.value.trim().length > 0) {
            this.props.functions.sendMessage(
                new Message(e.target.value.trim())
                    .align(Message.ALIGN_RIGHT)
                    .author(User.me)
            );

            e.target.value = "";
        }
    };

    return (
        <Grid item className={STYLE.main}>
            <div>
                <MessageList messages={props.messages} />
                <TextInput onEnter={handleEnter} />
            </div>
        </Grid>
    );

}

export default Main;