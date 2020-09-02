class User {
    constructor(client, name = null, color = "gray") {
        this.id = client.id;

        if (name == null) name = "User " + this.id;
            
        this.password = User.createPassword(32);
        this.name = name;
        this.color = color;

        this.assignMessage = (message) => {
            let clone = JSON.parse(JSON.stringify(message));
            clone.attributes.author = this.public();
            clone.attributes.align = "received";
            return clone;
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
    static publicVars = ["id", "name", "color"];
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