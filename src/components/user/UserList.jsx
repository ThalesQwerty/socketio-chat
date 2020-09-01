import React from "react";

import UserDisplay from "./UserDisplay";

import STYLE from "./styles/user.module.scss";

import {
    List
} from "@material-ui/core";

import User from "../../classes/User.js";

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
        loadUsers(props.users)
    }
    </List>
</>