class User {
    static list = [];
    static me = null;

    static same(users) {
        for (let i = 1; i < users.length; i++) {
            if (users[i].id !== users[i - 1].id) {
                return false;
            }
        }

        return true;
    }
}

export default User;