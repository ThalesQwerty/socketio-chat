class User {
    constructor(name, color) {
        this.id = User.list.length + 1;
        this.name = name;
        this.color = color;

        User.list.push(this);
    }

    static list = [];

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

export default User;