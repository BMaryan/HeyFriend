/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { AccountType, FirebaseType } from "../../../types/types";
import AvatarGroup from "@mui/material/AvatarGroup";
import styles from "./AvatarGroup.module.scss";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

interface AvatarPropsType {
  avatars: Array<FirebaseType<AccountType>>;
  max?: number;
  total?: number;
  spacing?: "medium" | "small";
  variant?: "circular" | "rounded" | "square";
}

const CustomAvatarGroup = (props: AvatarPropsType) => {
  return (
    <AvatarGroup variant={props?.variant} max={props?.max} total={props?.total} spacing={props?.spacing}>
      {props.avatars.map((avatar: FirebaseType<AccountType>) => (
        <Tooltip key={avatar.id} title={avatar.data().surname + " " + avatar.data().name}>
          <Avatar src={avatar.data().avatar || defaultAvatar} alt="" />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default CustomAvatarGroup;
