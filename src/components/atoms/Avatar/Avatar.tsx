import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import styles from "./Avatar.module.scss";
import Avatar from "@mui/material/Avatar";

interface AvatarPropsType {
  avatarData: any;
  size?: "small" | "medium" | "large" | "full";
}

const CustomAvatar = (props: AvatarPropsType) => {
  const size = props.size === "small" ? "10px" : props.size === "medium" ? "20px" : props.size === "large" ? "30px" : props.size === "full" ? "100%" : undefined;
  return <Avatar sx={{ maxHeight: size, maxWidth: size }} src={props.avatarData.avatar || defaultAvatar} alt="" />;
};

export default CustomAvatar;
