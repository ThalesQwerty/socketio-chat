class Message {
    constructor(content, type) {
        this.content = content;
        this.attributes = {
            type: type
        };
    }

    static SENT = "sent";
    static RECEIVED = "received";

    static style(type) {
        const styleBasis = {
            borderRadius: '1rem',
            maxWidth: '60%',
        
            transform: 'translateY(1rem)',
            opacity: '0',

            transitionProperty: 'opacity, transform',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'ease-out'
        };

        let style = JSON.parse(JSON.stringify(styleBasis));

        switch (type) {
            case Message.SENT:
                style.borderTopRightRadius = '0';
                break;
            case Message.RECEIVED:
                style.borderTopLeftRadius = '0';
                break;
        }

        console.log(type);
        console.log(style);

        return style;
    }
}

export default Message;