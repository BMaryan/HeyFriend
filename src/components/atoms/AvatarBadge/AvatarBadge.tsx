import React from "react";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import styles from "./AvatarBadge.module.scss";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

interface AvatarBadgePropsType {
  avatarData: any;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  anchorOrigin: { horizontal: "left" | "right"; vertical: "bottom" | "top" };
  overlap?: "circular" | "rectangular";
  badgeContent?: React.ReactNode;
  variant: "dot" | "standard";
  invisible: boolean;
}

const CustomAvatarBadge = (props: AvatarBadgePropsType) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      // color is default white fix this
      height: "10px",
      width: "10px",
      color: "currentColor",
      background: theme.palette[props.color],
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return props?.badgeContent ? (
    <Badge color={props.color} anchorOrigin={{ vertical: props.anchorOrigin.vertical, horizontal: props.anchorOrigin.horizontal }} invisible={props.invisible} overlap={props.overlap} badgeContent={props?.badgeContent} variant={props?.variant}>
      <Avatar src={props.avatarData.avatar || defaultAvatar} alt="" />
    </Badge>
  ) : (
    <StyledBadge color={props.color} anchorOrigin={{ vertical: props.anchorOrigin.vertical, horizontal: props.anchorOrigin.horizontal }} invisible={props.invisible} overlap={props.overlap} variant={props?.variant}>
      <Avatar src={props.avatarData?.avatar || defaultAvatar} alt="" />
    </StyledBadge>
  );
};

export default CustomAvatarBadge;
