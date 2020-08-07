import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import {
    ChatBubble as ChatBubbleIcon
} from "@material-ui/icons";

import STYLES from "./chat.module.scss";

export default (props) =>
    <Grid container 
        className={STYLES.textDiv} 
        alignItems="stretch"
    >
        <Grid item className={STYLES.chatBubbleIcon}>
            <ChatBubbleIcon />
        </Grid>
        <Grid item className={STYLES.textFieldParent}>
            <TextField 
                label="Type your message"
                className={STYLES.textField}
                InputProps={{
                    className: STYLES.textFieldValue
                }}
                InputLabelProps={{
                    className: STYLES.textFieldLabel
                }}
                variant="outlined" 
                onKeyDown={props.onEnter} 
            />
        </Grid>
    </Grid>