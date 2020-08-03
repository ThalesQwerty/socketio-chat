import React from "react";

import { 
    Typography,
    AppBar,
    Toolbar 
} from "@material-ui/core";

import {
    Forum as ForumIcon
} from "@material-ui/icons"

export default () =>
    <AppBar position="absolute">
        <Toolbar>
            <Typography style={{display: 'flex', alignItems: 'center'}}>
                <ForumIcon style={{marginRight: '0.5rem'}}/>
                QwertyChat!
            </Typography>
        </Toolbar>
    </AppBar>