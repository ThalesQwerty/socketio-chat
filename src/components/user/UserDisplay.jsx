import React from "react";

import { 
    Box,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";

import UserName from "./UserName";

export default (props) =>
<>
    <ListItem button>
        <UserName user={props.user}/>
    </ListItem>
</>