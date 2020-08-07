import React from "react";

import {
    Typography,
    AppBar,
    Toolbar,
    IconButton
} from "@material-ui/core";

import {
    Forum as ForumIcon,
    People as PeopleIcon
} from "@material-ui/icons"

import STYLES from "./layout.module.scss";

export default props =>
    <AppBar position="relative" style={{ height: '4rem' }}>
        <Toolbar>
            <Typography style={{ display: 'flex', alignItems: 'center' }}>
                <ForumIcon style={{ marginRight: '0.5rem' }} />
                QwertyChat!
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: '1' }}>
                <IconButton onClick={props.toggleUserList}>
                    <PeopleIcon/>
                </IconButton>
            </div>
        </Toolbar>
    </AppBar>