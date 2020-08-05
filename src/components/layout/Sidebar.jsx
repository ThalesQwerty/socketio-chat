import React from "react";

import { 
    Typography,
    Grid,
    Box
} from "@material-ui/core";

import UserList from "../user/UserList";

export default () =>
    <Grid item xl={2} lg={3} md={4} sm={5} xs={6} boxShadow={1} style={{ paddingTop: '3.5rem', paddingBottom: "0.5rem", paddingRight: "0.5rem", height: '100%' }}>
        <Box boxShadow={1} width={1} height={1} style={{ overflowX: "hidden", overflowY: "scroll" }}>
            <UserList/>
        </Box>
    </Grid>