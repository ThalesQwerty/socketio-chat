import React from "react";
import ReactDOM from "react-dom";

import {
    MessageAuthor,
    MessageBubble,
    MessageThread,
    TextInput
} from ".";

import {
    User,
    Message
} from "../../classes";

class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.scrollable = React.createRef();
    }

    printMessages(messages) {
        const list = [];
    
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const lastMessage = messages[i - 1] || null;

            console.log(message);
            console.log(lastMessage);

            let thread = lastMessage != null && User.same([message.attributes.author, lastMessage.attributes.author]) ? 
                Message.THREAD_MIDDLE : Message.THREAD_SINGLE;

            list.push(
                <MessageThread 
                    info={message.attributes}
                    thread={thread}
                >
                    {message.content}
                </MessageThread>
            );
        }
    
        return list;
    }

    shallScroll() {
        const div = this.scrollable.current;

        return div && div.scrollTop == div.scrollHeight - div.offsetHeight;
    }

    render() {    
        return (
            <div ref={this.scrollable} style={{ 

                flexGrow: '1', 
                height: 0, 
                width: '100%', 

                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 

                overflowY: 'scroll', 
                overflowX: 'hidden',

                padding: '0.5rem',
                paddingBottom: '2rem',
                paddingTop: 0,
            }}>
                {
                    this.printMessages(this.props.messages)
                }        
            </div>
        );
    }

    componentDidUpdate() {
        const div = this.scrollable.current;

        if (div && this.shallScroll()) {
            div.scrollTop = div.scrollHeight;
        }
    }
}


export default MessageList;
