class User {
    constructor(name, color) {
        this.id = User.list.length + 1;
        this.name = name;
        this.color = color;

        User.list.push(this);
    }

    static list = [];

    static random() {
        return User.list[Math.floor(Math.random() * User.list.length)];
    }

    static me() {
        return User.list[0];
    }
}

export default User;