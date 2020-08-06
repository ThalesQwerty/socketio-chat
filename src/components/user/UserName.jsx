import React from "react";

import { 
    ListItemText
} from "@material-ui/core";

import UserImage from "./UserImage";

export default props =>
<>
    <UserImage user={props.user}/>
    <ListItemText primary={props.user.name} marginRight={props.marginRight} />
</>