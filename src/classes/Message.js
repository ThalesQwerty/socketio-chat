import EasilyReadable from "./EasilyReadable";

class Message extends EasilyReadable {
    constructor(content) {
        super();

        this.content = content;
        this.attributes = {};

        this.createFunctions(Message, [
            "type", "author"
        ], (attr, value) => {
            this.attributes[attr] = value;
            return this
        });
    }
    
    // type(type) {
    //     this.attributes.type = type;
    //     return this;
    // }

    // author(user) {
    //     this.attributes.author = user;
    //     return this;
    // }

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