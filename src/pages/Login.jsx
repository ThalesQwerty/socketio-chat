import React from "react";

import STYLE from "./styles/Login.module.scss";

import {
    Grid,
    Box,
    TextField
} from "@material-ui/core";

import {
    TextInput
} from "../components/global";

import {
    Person as PersonIcon
} from "@material-ui/icons";


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEnter = e => {
        if (e.keyCode === 13 && e.target.value.trim().length > 0) {
            this.props.functions.login(
                {
                    name: e.target.value
                }
            );
        }
    };

    render() {
        return (
            <>
                <Box boxShadow={1} className={STYLE.main_container}>
                    <TextInput 
                        onEnter={this.handleEnter} 
                        placeholder="Type your username" 
                    />
                </Box>
            </>
        );
    }
}

export default Login;