import React from "react";

import { 
    Box
} from "@material-ui/core";

import Message from "../../classes/Message.js";


class MessageBubble extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.styles = Message.styles();
        this.bubble = React.createRef();
    }

    render() {
        return (
            <div style={{ 
                display: 'flex', 
                width: '100%',
                justifyContent: this.props.info.type == 'sent' ? 'flex-end' : 'flex-start',
                marginTop: '1rem' 
            }}>
                <Box ref={this.bubble} boxShadow={5} padding='1rem' style={this.styles[this.props.type] || {}}>
                    {this.props.children}
                </Box>
            </div>
        );
    }

    componentDidMount() {
        console.log(this.bubble.current.style);

        setTimeout(() => {
            const div = this.bubble.current.style;

            div.transform = "none";
            div.opacity = 1;
        }, 100);
    }
}

export default MessageBubble;