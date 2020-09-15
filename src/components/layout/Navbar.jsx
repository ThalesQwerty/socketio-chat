import React from "react";

import Room from "../../utils/MainRoom";

import {
    Typography,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton
} from "@material-ui/core";

import {
    Forum as ForumIcon,
    People as PeopleIcon,
    AddCircle as AddCircleIcon
} from "@material-ui/icons"

import STYLE from "./layout.module.scss";

export default props =>
    <AppBar position="relative">
        <Toolbar>
            <Typography className={STYLE.title}>
                <ForumIcon className={STYLE.icon} />
                {Room(props.room, "QwertyChat!")}
            </Typography>
            <div className={STYLE.buttons}>
                <Tooltip title="Create new room" placement="top">
                    <IconButton onClick={props.createRoom}>
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={props.userListVisible ? "Hide user list" : "Show user list"} placement="top">
                    <IconButton onClick={props.toggleUserList}>
                        <PeopleIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    </AppBar>