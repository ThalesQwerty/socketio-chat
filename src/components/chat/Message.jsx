import React from "react";

import { 
    Box
} from "@material-ui/core";

const styles = {
    received: {
        borderRadius: '1rem',
        borderTopLeftRadius: 0,
        maxWidth: '60%',
        textAlign: 'left',
    },
    sent: {
        borderRadius: '1rem',
        borderTopRightRadius: 0,
        maxWidth: '60%',
        textAlign: 'right',
    },
}

export default (props) =>
<>
    <div style={{ 
        display: 'flex', 
        width: '100%',
        justifyContent: props.info.type == 'sent' ? 'flex-end' : 'flex-start',
        marginTop: '1rem' 
    }}>
        <Box boxShadow={5} padding='1rem' style={styles[props.info.type] || {}}>
            {props.children}
        </Box>
    </div>
</>