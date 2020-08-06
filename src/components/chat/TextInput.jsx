import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import {
    ChatBubble as ChatBubbleIcon
} from "@material-ui/icons";

export default (props) =>
    <Grid container spacing={1} alignItems="stretch" style={{ 
        width: '100%',
        paddingTop: '2rem' 
    }}>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <ChatBubbleIcon />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
            <TextField id="input-with-icon-grid" label="Type your message" style={{ width: '100%' }} variant="outlined" onKeyDown={props.onEnter} />
        </Grid>
    </Grid>