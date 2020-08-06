import React from "react";

import UserName from "../user/UserImage";

import {
    MultipleStyles
} from "../../utils";

import STYLES from "./chat.module.css";

export default props =>
<>
    <div className={
        MultipleStyles([
            STYLES.author,
            STYLES[props.align]
        ])
    }>
        <small>
            {props.user.name}
        </small>
    </div>
</>