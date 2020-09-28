import React from "react";

import UserDisplay from "./UserDisplay";

import STYLE from "./styles/user.module.scss";

import {
    List
} from "@material-ui/core";

const loadUsers = (props) => {
    const users = props.users;
    const userList = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        userList.push(
            <UserDisplay key={i} user={user} onKick={props.onKick} />
        );
    }

    return userList;
}

export default (props) =>
<>
    <List component="nav" aria-label="main mailbox folders" className={STYLE.user_list}>
    {
        loadUsers(props)
    }
    </List>
</>