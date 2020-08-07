import React from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";

import {
    Container,
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
            <Box boxShadow={1} style={{ 
                height: '100%', 
                width: '100%', 
        
                maxWidth: '100rem',
                maxHeight: '50rem',
        
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Navbar toggleUserList={this.toggleUserList} />
                <Grid container style={{ flexGrow: '1', overflow: 'hidden' }}>
                    <Main />
                    <Sidebar visible={this.state.layout.userList}/>
                </Grid>
            </Box>
        );
    }
}

export default Chat;