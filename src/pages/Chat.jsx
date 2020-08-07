import React from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";

import {
    Container,
    Grid,
    Box
} from "@material-ui/core";

export default () =>
    <Box boxShadow={1} style={{ 
        height: '100%', 
        width: '100%', 

        maxWidth: '100rem',
        maxHeight: '50rem',

        display: 'flex',
        flexDirection: 'column'
    }}>
        <Navbar />
        <Grid container style={{ flexGrow: '1', overflow: 'hidden' }}>
            <Main />
            <Sidebar />
        </Grid>
    </Box>