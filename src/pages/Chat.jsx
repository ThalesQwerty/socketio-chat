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
<div style={{height: '100vh', display: 'flex'}}>
    <Navbar/>
        <Grid container style={{flexGrow: 1}}>
            <Main/>
            <Sidebar/>
        </Grid>  
</div>