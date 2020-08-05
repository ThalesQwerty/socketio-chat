import React from "react";

import { 
    Box,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";

import UserImage from "./UserImage";

export default (props) =>
<>
    <ListItem button>
        <UserImage info={props.info}/>
        <ListItemText primary={props.info.name} />
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