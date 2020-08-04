import React from "react";

import User from "./User";

import {
    List
} from "@material-ui/core";

const USERS = [
    {
        name: "User 1",
        color: "red"
    },
    {
        name: "User 2",
        color: "blue"
    },
    {
        name: "User 3",
        color: "green"
    }
];

const loadUsers = (users) => {
    const userList = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        userList.push(
            <User key={i} info={user}/>
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