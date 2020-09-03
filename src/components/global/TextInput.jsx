import React from "react";

import {
    Grid,
    TextField
} from "@material-ui/core";

import {
    If
} from "../../utils";

import STYLE from "./styles/text_input.module.scss";

export default (props) =>
    <Grid container 
        className={props.containerStyle} 
        spacing={1}
        alignItems="center"
        justify="center"
    >
        <If condition={props.icon != null}>
            <Grid item className={STYLE.textFieldIcon}>
                { props.icon }
            </Grid>
        </If>
        <Grid item className={STYLE.textFieldParent}>
            <TextField 
                label={props.placeholder}
                className={STYLE.textField}
                InputProps={{
                    className: STYLE.textFieldValue
                }}
                InputLabelProps={{
                    className: STYLE.textFieldLabel
                }}
                variant="filled" 
                onKeyDown={props.onEnter} 
            />
        </Grid>
    </Grid>