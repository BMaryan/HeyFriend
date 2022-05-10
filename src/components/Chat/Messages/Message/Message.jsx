import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.scss";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../../core/constants/constants";

const Message = (props) => {
  let checkMessage = (props.account && props.id && props.el.userId && props.id !== props.el.userId && props.account.id === props.el.userId && props.id === props.account.id) || (props.account && props.id && props.el.userId && props.id === props.account.id && props.id === props.el.userId) || (props.account && props.id && props.el.userId && props.id === props.account.id && props.account.id === props.el.userId) || (props.account && props.id && props.el.userId && props.id !== props.account.id && props.account.id === props.el.userId);

  let myProfile = props.accounts ? props.accounts.find((profile) => (props.account ? profile.id === props.account.id : undefined)) : undefined;
  let otherProfile = props.accounts ? props.accounts.find((profile) => (props.account ? profile.id !== props.account.id : undefined)) : undefined;

  return (
    <div className={checkMessage ? styles.wrapper_container_myMessage : styles.wrapper_container_otherMessage + " " + styles.wrapper_container_message}>
      <NavLink to={props.account && props.account.id !== props.id ? `${profileConstant.path}/` + props.id : `${profileConstant.path}`} className={checkMessage ? styles.wrapper_myPicture : styles.wrapper_otherPicture + " " + styles.wrapper_picture}>
        <img src={myProfile && myProfile.profile.img ? myProfile.profile.img : otherProfile && otherProfile.profile.img ? otherProfile.profile.img : defaultAvatar} alt="" />
      </NavLink>
      <div className={checkMessage ? styles.wrapper_myMessage : styles.wrapper_otherMessage + " " + styles.wrapper_message}>{props.el && props.el.message}</div>
    </div>
  );
};

export default Message;
