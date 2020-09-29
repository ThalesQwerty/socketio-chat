const { User } = require("./User");

class Room {
    constructor(id, owner) {
        if (id.trim() == "") id = "main";
        id = id.trim();

        this.id = id;
        this.owner = owner;
        this.blackList = [];
        this.numUsers = 0;
            
        this.kickUser = userId => {
            this.blackList.push(
                User.find(userId).cookie
            );
        };

        this.addUser = () => {
            this.numUsers ++;
        }

        this.removeUser = () => {
            this.numUsers --;

            if (this.numUsers <= 0 && this.id != "main") {
                setTimeout(() => {
                    if (this.numUsers <= 0) Room.remove(this.id);
                }, 60000);
            }
        }

        this.gate = user => this.blackList.indexOf(user.cookie) < 0;

        if (id != "main") Room.list.push(this);
    }

    static list = [
        new Room("main", null)
    ];

    static find(id) {
        if (id.trim() == "") id = "main";
        id = id.trim();

        return Room.list.filter(room => room.id == id)[0];
    }

    static remove(id) {
        if (id.trim() == "") id = "main";
        id = id.trim();

        for (let i = 0; i < Room.list.length; i++) {
            const user = Room.list[i];

            if (user.id == id) {
                Room.list.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = Room;