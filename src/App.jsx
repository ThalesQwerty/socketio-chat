import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Chat from "./pages/Chat";

import "./App.scss";

const THEME = createMuiTheme({
    palette: {
      type: 'dark',
    },
});


export default () =>
<>
    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chat/>
    </div>
</>