import React from "react";

import { 
    Box
} from "@material-ui/core";

import {
    MultipleStyles
} from "../../utils";

import STYLE from "./chat.module.scss";

export default props =>
    <Box 
        boxShadow={1} 
        padding='1rem' 
        className={
            MultipleStyles([
                STYLE.message,
                STYLE[props.align],
                STYLE[props.thread]
            ])
        }
    >
        {props.children}
    </Box>