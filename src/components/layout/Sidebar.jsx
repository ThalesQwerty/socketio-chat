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

import STYLES from "./layout.module.scss";

export default props =>
    <Grid item boxShadow={1} className={
        props.visible ? 
        STYLES.sidebar : 
        MultipleStyles([
            STYLES.sidebar,
            STYLES.hidden
        ])
    }>
        <Box boxShadow={1} width={1} height={1} style={{ overflowX: "hidden", overflowY: "scroll" }}>
            <UserList/>
        </Box>
    </Grid>