import React from "react";

import If from "../../utils/If";

import STYLE from "./styles/user.module.scss";

import {
    ListItem,
    Divider,
    Button,
    Tooltip
} from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons"

import UserName from "./UserName";

export default (props) =>
    <>
        <ListItem button>
            <UserName user={props.user} />
            <If condition={props.user.owner}>
                <Tooltip title="Room owner" placement="left">
                    <span className={STYLE.userIcon}>
                        <FontAwesomeIcon icon={faCrown} />
                    </span>
                </Tooltip>
            </If>
        </ListItem>
        <If condition={props.user.me}>
            <Divider className={STYLE.divider} />
        </If>
    </>