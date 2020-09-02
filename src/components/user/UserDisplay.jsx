import React from "react";

import If from "../../utils/If";

import STYLE from "./styles/user.module.scss";

import { 
    Box,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";

import UserName from "./UserName";

export default (props) =>
<>
    <ListItem button>
        <UserName user={props.user}/>
    </ListItem>
    <If condition={props.user.me}>
        <Divider className={STYLE.divider}/>
    </If>
</>