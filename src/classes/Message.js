import EasilyReadable from "./utils/EasilyReadable";

class Message extends EasilyReadable {
    constructor(content) {
        super();

        this.content = content;
        this.attributes = {};

        this.createFunctions(Message, [
            "type", "author", "align"
        ], (attr, value) => {
            this.attributes[attr] = value;
            return this
        });
    }

    static LEFT = "received";
    static RIGHT = "sent";

    static style(type) {
        const styleBasis = {
            borderRadius: '1rem',
            maxWidth: '60%',
        
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