import React from "react";

export default props =>
<>
    {
        (props.condition ? props.children : <></>)
    }
</>