import React from "react";

import { 
    Box
} from "@material-ui/core";

import {
    MultipleStyles
} from "../../classes/utils";

import Message from "../../classes/Message.js";

import UserImage from "../user/UserImage";

import STYLES from "./chat.module.css";

class MessageBubble extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                div: STYLES.fadeInWait
            }
        };

        this.props = props;

        this.info = props.info;
        this.content = props.children;

        this.bubble = React.createRef();
        this.div = React.createRef();
    }

    render() {
        return (
            <div 
                ref={this.div}
                className={
                    MultipleStyles([
                        this.state.style.div, 
                        STYLES.parentDiv, 
                        STYLES[this.info.align]
                    ])
                } 
            >
                {/* <MessageAuthor>
                    {this.info.author}
                </MessageAuthor> */}
                <UserImage 
                    info={this.info.author}
                    marginRight='0rem'
                    marginLeft='0rem'
                />
                <Box 
                    ref={this.bubble} 
                    boxShadow={5} 
                    padding='1rem' 
                    className={
                        MultipleStyles([
                            STYLES.message,
                            STYLES[this.info.align]
                        ])
                    }
                >
                    {this.content}
                </Box>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            const div = this.div.current.style;

            this.setState({
                style: {
                    div: STYLES.fadeInDone
                }
            });
        }, 100);
    }
}

export default MessageBubble;