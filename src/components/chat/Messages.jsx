import React from "react";

import Message from "./Message";

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    printMessages(messages) {
        const list = [];
    
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
    
            list.push(
                <Message info={message.attributes}>
                    {message.content}
                </Message>
            );
        }
    
        return list;
    }

    render() {
        return (
            <div style={{ flexGrow: '1', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                {
                    this.printMessages(this.props.messages)
                }        
            </div>
        );
    }
}


export default Messages;
