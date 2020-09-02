import React from "react";

import {
    MultipleStyles,
    If
} from "../../utils";

import {
    MessageAuthor,
    MessageBubble,
} from ".";

import Message from "../../classes/Message.js";

import UserImage from "../user/UserImage";

import STYLE from "./chat.module.scss";

class MessageThread extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                div: STYLE.fadeInWait
            }
        };

        this.props = props;

        this.content = props.children;

        this.bubble = React.createRef();
        this.div = React.createRef();
    }

    render() {
        const firstMessage = this.props.thread === Message.THREAD_SINGLE || this.props.thread === Message.THREAD_FIRST;
        return (
            <div 
                ref={this.div}
                className={
                    MultipleStyles([
                        this.state.style.div, 
                        STYLE.messageParentDiv, 
                        STYLE[this.props.info.align]
                    ])
                } 
            >
                
                {/* <MessageAuthor>
                    {this.info.author}
                </MessageAuthor> */}
                <If condition={firstMessage}>
                    <UserImage 
                        user={this.props.info.author}
                        marginRight='0rem'
                        marginLeft='0rem'
                    />
                </If>
                <div 
                    className={STYLE.messageChildDiv}
                >
                    <If condition={firstMessage}>
                        <MessageAuthor 
                            user={this.props.info.author} 
                            align={this.props.info.align} 
                        />
                    </If>
                    <MessageBubble 
                        ref={this.bubble} 
                        align={this.props.info.align} 
                        thread={this.props.thread}
                    >
                        {this.content}
                    </MessageBubble>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                style: {
                    div: STYLE.fadeInDone
                }
            });
        }, 100);
    }
}

export default MessageThread;