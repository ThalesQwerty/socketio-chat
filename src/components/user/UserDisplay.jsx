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

    {/* <Box boxShadow={1} style={{
        width: '100%',
        height: '2rem',

        padding: '1rem',

        display: 'flex',
        alignItems: 'center'
    }}>
        <UserImage info={props.info}/>
        {props.info.name}
    </Box> */}
</>