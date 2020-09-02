import React from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";

import STYLE from "./styles/Chat.module.scss";

import {
    Grid,
    Box
} from "@material-ui/core";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layout: {
                userList: true
            }
        }

    }

    toggleUserList = (e) => {
        const previous = this.state.layout.userList;

        this.setState({
            layout: {
                userList: !previous
            }
        });
    }

    render() {
        return (
            <Box boxShadow={1} className={STYLE.main_container}>
                <Navbar toggleUserList={this.toggleUserList} userListVisible={this.state.layout.userList} />
                <Grid container className={STYLE.messages_and_users}>
                    <Main messages={this.props.messages} functions={this.props.functions} />
                    <Sidebar visible={this.state.layout.userList} users={this.props.users}/>
                </Grid>
            </Box>
        );
    }
}

export default Chat;