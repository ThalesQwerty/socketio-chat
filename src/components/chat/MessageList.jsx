import React from "react";
import ReactDOM from "react-dom";

import MessageBubble from "./MessageBubble";

class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.scrollable = React.createRef();
    }

    printMessages(messages) {
        const list = [];
    
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
    
            list.push(
                <MessageBubble info={message.attributes}>
                    {message.content}
                </MessageBubble>
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
            console.log(div.style);
            div.scrollTop = div.scrollHeight;
        }
    }
}


export default MessageList;
