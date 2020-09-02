import React from "react";

import {
    Grid,
    TextField
} from "@material-ui/core";

import {
    ChatBubble as ChatBubbleIcon
} from "@material-ui/icons";

import STYLE from "./chat.module.scss";

export default (props) =>
    <Grid container 
        className={STYLE.textDiv} 
        alignItems="stretch"
    >
        <Grid item className={STYLE.chatBubbleIcon}>
            <ChatBubbleIcon color="primary" />
        </Grid>
        <Grid item className={STYLE.textFieldParent}>
            <TextField 
                label="Type your message"
                className={STYLE.textField}
                InputProps={{
                    className: STYLE.textFieldValue
                }}
                InputLabelProps={{
                    className: STYLE.textFieldLabel
                }}
                variant="filled" 
                onKeyDown={props.onEnter} 
            />
        </Grid>
    </Grid>