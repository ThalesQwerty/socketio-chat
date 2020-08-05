import React from "react";

import UserDisplay from "./UserDisplay";

import {
    List
} from "@material-ui/core";

import User from "../../classes/User.js";

const USERS = [
    new User("User 1", "red"),
    new User("User 2", "blue"),
    new User("User 3", "green")
];

const loadUsers = (users) => {
    const userList = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        userList.push(
            <UserDisplay key={i} info={user}/>
        );
    }

    return userList;
}

export default (props) =>
<>
    <List component="nav" aria-label="main mailbox folders">
    {
        loadUsers(USERS)
    }
    </List>
</>