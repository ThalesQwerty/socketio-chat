import React from "react";

import { 
    Box
} from "@material-ui/core";

import UserImage from "./UserImage";

export default (props) =>
<>
    <Box boxShadow={1} style={{
        width: '100%',
        height: '2rem',

        padding: '1rem',

        display: 'flex',
        alignItems: 'center'
    }}>
        <UserImage info={props.info}/>
        {props.info.name}
    </Box>
</>