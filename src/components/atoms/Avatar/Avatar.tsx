import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { AccountType } from "../../../types/types";
import styles from "./Avatar.module.scss";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";

interface AvatarPropsType {
  avatarData: AccountType;
  title?: string;
  size?: "small" | "medium" | "large" | "full";
  variant?: "circular" | "rounded" | "square";
  onClick?: () => void;
}

const CustomAvatar = (props: AvatarPropsType) => {
  const size = props.size === "small" ? "15px" : props.size === "medium" ? "30px" : props.size === "large" ? "45px" : props.size === "full" ? "100%" : undefined;
  return (
    <Tooltip title={props.title ? props.title : props.avatarData.surname + " " + props.avatarData.name}>
      <Avatar sx={{ maxHeight: size, maxWidth: size, cursor: props.onClick && "pointer" }} src={props.avatarData.avatar || defaultAvatar} alt="" variant={props.variant} onClick={props.onClick} />
    </Tooltip>
  );
};

export default CustomAvatar;
