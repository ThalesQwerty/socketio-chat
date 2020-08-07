import React from "react";

import { 
    Typography,
    Grid,
    Box
} from "@material-ui/core";

import UserList from "../user/UserList";

import STYLES from "./layout.module.scss";

export default () =>
    <Grid item boxShadow={1} className={STYLES.sidebar}>
        <Box boxShadow={1} width={1} height={1} style={{ overflowX: "hidden", overflowY: "scroll" }}>
            <UserList/>
        </Box>
    </Grid>