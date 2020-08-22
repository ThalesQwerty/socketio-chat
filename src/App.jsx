import React from "react";

import { ThemeProvider } from '@material-ui/styles';

import THEME from "./styles/MaterialUITheme.js";
import STYLE from "./styles/App.module.scss";

import Chat from "./pages/Chat";

import "./styles/App.scss";

export default () =>
<>
    <ThemeProvider theme={THEME}>
        <div className={STYLE.app_container}>
            <Chat/>
        </div>
    </ThemeProvider>
</>