import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FirebaseType } from "../../../types/types";
import styles from "./AvatarGroup.module.scss";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";

interface AvatarPropsType {
  avatars: Array<any>;
  max?: number;
  total?: number;
  spacing?: "medium" | "small";
  variant?: "circular" | "rounded" | "square";
}

const CustomAvatarGroup = (props: AvatarPropsType) => {
  return (
    <AvatarGroup variant={props?.variant} max={props?.max} total={props?.total} spacing={props?.spacing}>
      {props.avatars.map((avatar: FirebaseType<any>) => (
        <Tooltip key={avatar.id} title={avatar.data().surname + " " + avatar.data().name}>
          <Avatar src={avatar.data().avatar || defaultAvatar} alt="" />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default CustomAvatarGroup;
