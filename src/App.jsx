import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { red, lightBlue } from '@material-ui/core/colors';



import Chat from "./pages/Chat";

import "./App.scss";

const THEME = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
          main: red[800]
      },
      secondary: {
          main: lightBlue[400]
      }
    },
});

export default () =>
<>
    <ThemeProvider theme={THEME}>
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Chat/>
        </div>
    </ThemeProvider>
</>