import EasilyReadable from "../utils/EasilyReadable";

class Message extends EasilyReadable {
    constructor(content, type = Message.TYPE_MESSAGE) {
        super(content);
        
        this.content = content;
        this.type = type;
        this.attributes = {
            align: Message.ALIGN_LEFT,
        };

        this.createFunctions(Message, [
            "author", "align"
        ], (attr, value) => {
            this.attributes[attr] = value;
            return this;
        });
    }
    
    // TYPE
    static TYPE_MESSAGE = "message";
    static TYPE_EVENT = "event";

    // ALIGN
    static ALIGN_LEFT = "received";
    static ALIGN_RIGHT = "sent";

    // THREAD
    static THREAD_SINGLE = "single-message";
    static THREAD_FIRST = "first-message";
    static THREAD_MIDDLE = "middle-message";
    static THREAD_LAST = "last-message";
}

export default Message;