import React from "react";

import { 
    Box
} from "@material-ui/core";

import {
    MultipleStyles
} from "../../utils";

import STYLES from "./chat.module.scss";

export default props =>
    <Box 
        boxShadow={5} 
        padding='1rem' 
        className={
            MultipleStyles([
                STYLES.message,
                STYLES[props.align],
                STYLES[props.thread]
            ])
        }
    >
        {props.children}
    </Box>