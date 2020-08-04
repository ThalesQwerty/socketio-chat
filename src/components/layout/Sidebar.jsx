import React from "react";

import { 
    Typography,
    Grid,
    Box
} from "@material-ui/core";

import UserList from "../user/UserList";

export default () =>
    <Grid item xl={2} lg={3} md={4} sm={5} xs={6} boxShadow={1} style={{ marginTop: '3rem' }}>
        <Box boxShadow={1} width={1} height={1}>
            <UserList/>
        </Box>
    </Grid>