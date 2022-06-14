import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.scss";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../../core/constants/constants";

const Message = (props) => {
  let isMyAccount = props?.message?.data()?.id === props?.account?.id;
  // let myIndex = [];
  // myIndex.push(props.myIndex);
  // let otherIndex = [];
  // let currentAccount = props?.accounts ? props?.accounts?.map((account) => (props?.message?.data()?.id === props?.account?.id ? account : undefined)) : undefined;

  // let test = () => myIndex.length > 0 ? ;
  // test();

  // console.log(props.myIndex);

  return (
    <div className={isMyAccount ? styles.wrapper_container_myMessage : styles.wrapper_container_otherMessage + " " + styles.wrapper_container_message}>
      <NavLink to={`${profileConstant.path}/${isMyAccount ? props?.account?.id : props?.chatWithAccount?.data()?.id}`} className={isMyAccount ? styles.wrapper_myPicture : styles.wrapper_otherPicture + " " + styles.wrapper_picture}>
        <img src={isMyAccount ? props?.account?.avatar : props?.chatWithAccount?.data() ? props?.chatWithAccount?.data()?.avatar : defaultAvatar} alt="" />
      </NavLink>
      <div className={isMyAccount ? styles.wrapper_myMessage : styles.wrapper_otherMessage + " " + styles.wrapper_message}>{props?.message?.data()?.message}</div>
    </div>
  );
};

export default Message;
