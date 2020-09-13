import React from "react";

import STYLE from "./styles/Login.module.scss";

import Room from "../utils/MainRoom";

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
                <Box boxShadow={1} className={STYLE.mainContainer}>
                    <div className={STYLE.welcomeText}>
                        Welcome to { Room(
                            this.props.room,
                            "QwertyChat",
                            <>room <strong>"{this.props.room}"</strong></>
                        )}
                        !
                    </div>
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