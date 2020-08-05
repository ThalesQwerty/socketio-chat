class Message {
    constructor(content, type) {
        this.content = content;
        this.attributes = {
            type: type
        };
    }

    static SENT = "sent";
    static RECEIVED = "received";

    static styles() {
        const types = [
            Message.SENT,
            Message.RECIEVED
        ];

        const styleBasis = {
            borderRadius: '1rem',
            maxWidth: '60%',
        
            transform: 'translateY(1rem)',
            opacity: '0',

            transitionProperty: 'opacity, transform',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'ease-out'
        };

        var styleList = {};

        for (const type of types) {
            styleList[type] = JSON.parse(JSON.stringify(styleBasis));
        }

        return styleList;
    }
}

export default Message;