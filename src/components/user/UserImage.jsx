import React from "react";

import STYLE from "./styles/user.module.scss";

import {
    Box
} from "@material-ui/core";

import {
    Person as PersonIcon, Style
} from "@material-ui/icons"

const defaultImage = (props) => (
    <Box
        className={STYLE.default_image_container} 
        style={{
            marginRight: props.marginRight || '1rem',
            marginLeft: props.marginLeft || '0rem',
            backgroundColor: props.user.color || 'gray'
        }}
    >
        <PersonIcon className={STYLE.default_image} />
    </Box>
);

export default (props) =>
    <>
        {defaultImage(props)}
    </>