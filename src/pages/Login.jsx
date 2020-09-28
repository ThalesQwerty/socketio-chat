import React from "react";

import STYLE from "./styles/Login.module.scss";

import Room from "../utils/MainRoom";

import {
    Box,
    Button
} from "@material-ui/core";

import {
    If
} from "../utils";

import {
    TextInput
} from "../components/global";


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEnter = e => {
        if (e.keyCode === 13 && e.target.value.trim().length > 0) {
            const loginData = {
                user: {
                    name: e.target.value
                }
            };

            const createRoomData = this.props.createRoom ? {
                user: {
                    name: this.props.user.name
                },
                room: e.target.value
            } : null;

            const data = createRoomData || loginData;

            this.props.functions.login(data);
        }
    };

    handleButton = e => {
        this.props.functions.cancelCreateRoom();
    }

    render() {
        return (
            <>
                <Box boxShadow={1} className={STYLE.mainContainer}>
                    <div className={STYLE.welcomeText}>
                        {
                            this.props.error || (this.props.createRoom ?

                                "Create a new room"

                                :

                                <>
                                    Welcome to {
                                        Room(
                                            this.props.room,
                                            "QwertyChat!",
                                            <>room <strong>"{this.props.room.trim()}"!</strong></>
                                        )
                                    }
                                </>

                            )
                        }
                    </div>
                    <If condition={this.props.showInput}>
                        <TextInput 
                            className={STYLE.textInput}
                            onEnter={this.handleEnter}
                            placeholder={this.props.createRoom ? "Type new room name" : "Type your username"}
                        />
                        <small className={STYLE.subText}>
                            {this.props.subText}
                        </small>
                    </If>
                    <If condition={this.props.buttonText}>
                        <Button 
                            className={STYLE.cancelButton} 
                            onClick={this.handleButton}
                            variant="contained" 
                            color="primary" 
                            disableElevation
                        >
                            { this.props.buttonText || "Button" }
                        </Button>
                    </If>
                </Box>
            </>
        );
    }
}

export default Login;