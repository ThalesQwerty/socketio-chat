import React from "react";

import STYLE from "./styles/user.module.scss";

import {
    Person as PersonIcon, Style
} from "@material-ui/icons"

const defaultImage = (props) => (
    <div 
        className={STYLE.default_image_container} 
        style={{
            marginRight: props.marginRight || '1rem',
            marginLeft: props.marginLeft || '0rem',
            color: props.user.color || 'gray'
        }}
    >
        <PersonIcon className={STYLE.default_image} />
    </div>
);

export default (props) =>
    <>
        {defaultImage(props)}
    </>