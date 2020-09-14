import React from "react";

import STYLE from "./chat.module.scss";

export default props =>
    <>
        <div className={STYLE.chatEvent}>
            {props.children}
        </div>
    </>