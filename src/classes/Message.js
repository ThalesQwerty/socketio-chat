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
}

export default Message;