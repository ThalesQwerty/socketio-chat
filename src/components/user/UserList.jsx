import React from "react";

import UserDisplay from "./UserDisplay";

import STYLE from "./styles/user.module.scss";

import {
    List
} from "@material-ui/core";

import User from "../../classes/User.js";

const USERS = [
    new User("You", "gray")
];

for (let i = 0; i < 50; i++) {
    const colors = [
        '#4caf50',
        '#f44336',
        '#ffcd38',
        '#3f50b5',
        '#35baf6',
        '#ffa726',
        '#bb6bc9'
    ];

    USERS.push(
        new User("User " + (i + 1), colors[Math.floor(Math.random() * colors.length)])
    );
}

const loadUsers = (users) => {
    const userList = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        userList.push(
            <UserDisplay key={i} user={user}/>
        );
    }

    return userList;
}

export default (props) =>
<>
    <List component="nav" aria-label="main mailbox folders" className={STYLE.user_list}>
    {
        loadUsers(USERS)
    }
    </List>
</>