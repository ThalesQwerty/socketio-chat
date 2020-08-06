import React from "react";

import {
    Person as PersonIcon
} from "@material-ui/icons"

const defaultImage = (props) => (
    <div style={{
        backgroundColor: props.user.color || 'gray',
        borderRadius: '50%',

        width: '2rem',
        height: '2rem',

        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',

        marginRight: props.marginRight || '1rem',
        marginLeft: props.marginLeft || '0rem'
    }}>
        <PersonIcon style={{
            fontSize: '2em',
            color: 'rgba(0, 0, 0, 0.5)'
        }} />
    </div>
);

export default (props) =>
    <>
        {defaultImage(props)}
    </>