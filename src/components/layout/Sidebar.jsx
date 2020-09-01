import React from "react";

import { 
    Typography,
    Grid,
    Box
} from "@material-ui/core";

import UserList from "../user/UserList";

import {
    MultipleStyles
} from "../../utils";

import STYLE from "./layout.module.scss";

export default props =>
    <Grid item boxShadow={1} className={
        props.visible ? 
        STYLE.sidebar : 
        MultipleStyles([
            STYLE.sidebar,
            STYLE.hidden
        ])
    }>
        <Box boxShadow={1} width={1} height={1} className={STYLE.user_list}>
            <UserList users={props.users}/>
        </Box>
    </Grid>