class User {
    constructor(client, name = "User", color = "gray") {
        this.id = User.list.length > 0 ? 
            User.list[User.list.length - 1].id + 1 
            : 1;

            
        this.client = client.id;
        this.password = User.createPassword(32);
        this.name = name;
        this.color = color;

        this.public = () => {
            let clone = {};

            for (const attr of User.publicVars) {
                clone[attr] = this[attr];
            }

            return clone;
        }
        
        this.me = () => {
            let clone = this.public();
            clone.name = "You";
            clone.password = this.password;

            return clone;
        }


        User.list.push(this);
    }

    static publicVars = ["id", "name", "color"];
    static list = [];

    static remove(id) {
        let index = -1;

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