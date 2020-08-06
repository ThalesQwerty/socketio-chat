import React from "react";

import { 
    ListItemText
} from "@material-ui/core";

import UserImage from "./UserImage";

export default props =>
<>
    <UserImage info={props.info}/>
    <ListItemText primary={props.info.name} marginRight={props.marginRight} />
</>