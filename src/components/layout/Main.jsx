import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import Messages from "../chat/Messages";
import TextInput from "../chat/TextInput";

var messages = [
    {
        attributes: {
            type: 'sent',
        },
        content: 'Hello'
    },
    {
        attributes: {
            type: 'received',
        },
        content: 'Hi'
    }
];


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: messages
        };
    }

    newMessage = (e) => {
        if (e.keyCode == 13) {
            const message = {
                attributes: {
                    type: 'sent'
                },
                content: e.target.value
            };

            let newArray = this.state.messages.slice(0);
            newArray.push(message);

            e.target.value = "";

            this.setState({
                messages: newArray
            }, () => console.log(this.state)
            );

        }
    }

    render() {
        return (
            <Grid item xl={10} lg={9} md={8} sm={7} xs={6} style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '1rem'
                }}>
                    <Messages messages={this.state.messages} />
                    <TextInput onEnter={this.newMessage} />
                </div>
            </Grid>
        );
    }
}

export default Main;