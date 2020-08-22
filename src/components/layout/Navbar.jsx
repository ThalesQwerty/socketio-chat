import React from "react";

import {
    Typography,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton
} from "@material-ui/core";

import {
    Forum as ForumIcon,
    People as PeopleIcon
} from "@material-ui/icons"

import STYLE from "./layout.module.scss";

export default props =>
    <AppBar position="relative">
        <Toolbar>
            <Typography className={STYLE.title}>
                <ForumIcon className={STYLE.icon} />
                QwertyChat!
            </Typography>
            <div className={STYLE.buttons}>
                <Tooltip title={props.userListVisible ? "Hide user list" : "Show user list"} placement="top">
                    <IconButton onClick={props.toggleUserList}>
                        <PeopleIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    </AppBar>