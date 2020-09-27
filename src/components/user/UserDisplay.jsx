import React from "react";

import If from "../../utils/If";

import STYLE from "./styles/user.module.scss";

import {
    ListItem,
    Divider,
    Button,
    Tooltip
} from "@material-ui/core";

import {
    RemoveCircle as RemoveCircleIcon 
} from '@material-ui/icons';

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
            <If condition={props.user.kickable}>
                <Tooltip title="Kick user" placement="left">
                    <span className={STYLE.userIcon}>
                        <RemoveCircleIcon />
                    </span>
                </Tooltip>
            </If>
        </ListItem>
        <If condition={props.user.me}>
            <Divider className={STYLE.divider} />
        </If>
    </>