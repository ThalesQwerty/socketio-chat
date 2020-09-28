const Colors = require("../../src/data/random_user_colors.json");

class User {
    constructor(client, data, room = "main", cookie = null) {

        User.counter = User.list.length > 0 ? User.counter + 1 : 1;

        this.id = client.id;
        this.cookie = cookie;
        this.room = room;
        this.owner = room.id.length > 0 && room.id != "main" && User.list.filter(user => user.room.id == room.id).length == 0;
        this.kicked = false;
            
        this.password = User.createPassword(32);
        this.name = data.name || "User #" + User.counter;
        this.color = data.color || Colors[Math.floor(Math.random() * Colors.length)];

        this.assignMessage = (message) => {
            return {
                content: message,
                author: this.public()
            }
        }

        this.public = () => {
            let clone = {};

            for (const attr of User.publicVars) {
                clone[attr] = this[attr];
            }

            return clone;
        }
        
        this.me = () => {
            let clone = this.public();
            clone.me = true;
            clone.password = this.password;

            return clone;
        }


        User.list.push(this);
    }

    static counter = 0;
    static publicVars = ["id", "name", "color", "owner"];
    static list = [];

    static find(id) {
        for (let i = 0; i < User.list.length; i++) {
            const user = User.list[i];

            if (user.id == id) {
                return User.list[i];
            }
        }
    }

    static remove(id) {
        for (let i = 0; i < User.list.length; i++) {
            const user = User.list[i];

            if (user.id == id) {
                User.list.splice(i, 1);
                break;
            }
        }
    }

    static createPassword(length = 32) {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        let password = "";

        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

        return password;
    }

    static random() {
        do {
            var selected = User.list[Math.floor(Math.random() * User.list.length)];
        } while (
            User.same([selected, User.me()])
        );
        
        return selected;
    }

    static me() {
        return User.list[0];
    }

    static same(users) {
        for (let i = 1; i < users.length; i++) {
            if (users[i].id != users[i - 1].id) {
                return false;
            }
        }

        return true;
    }
}

module.exports = User;