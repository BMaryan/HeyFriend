import React from "react";
import { AccountType, ChatType, MessageType } from "../../../../types/types";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../../../core/constants/constants";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.scss";

interface MessagePropsType {
  message: MessageType;
  account: AccountType | null;
  chatWithAccount: ChatType | undefined;
}

const Message = (props: MessagePropsType) => {
  const isMyAccount = props?.message?.data()?.id === props?.account?.id;
  // const myIndex = [];
  // myIndex.push(props.myIndex);
  // const otherIndex = [];
  // const currentAccount = props?.accounts ? props?.accounts?.map((account) => (props?.message?.data()?.id === props?.account?.id ? account : undefined)) : undefined;

  // const test = () => myIndex.length > 0 ? ;
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
