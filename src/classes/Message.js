import EasilyReadable from "../utils/EasilyReadable";

class Message extends EasilyReadable {
    constructor(content) {
        super();

        this.content = content;
        this.attributes = {
            align: Message.ALIGN_LEFT,
        };

        this.createFunctions(Message, [
            "author", "align",
        ], (attr, value) => {
            this.attributes[attr] = value;
            return this
        });
    }

    static ALIGN_LEFT = "received";
    static ALIGN_RIGHT = "sent";

    static THREAD_SINGLE = "single-message";
    static THREAD_FIRST = "first-message";
    static THREAD_MIDDLE = "middle-message";
    static THREAD_LAST = "last-message";
}

export default Message;