import React from "react";

import UserName from "../user/UserImage";

import {
    MultipleStyles
} from "../../utils";

import STYLE from "./chat.module.scss";

export default props =>
<>
    <div className={
        MultipleStyles([
            STYLE.author,
            STYLE[props.align]
        ])
    }>
        <small>
            {props.user.name}
        </small>
    </div>
</>