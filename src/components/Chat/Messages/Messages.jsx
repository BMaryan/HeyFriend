import React from "react";
import styles from "./Messages.module.scss";
import Message from "./Message/Message";
import { CircularProgress } from "@mui/material";

const Messages = (props) => {
  if (!props.messages) {
    return (
      <div className="wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      <div className={styles.messages_content}>{props?.messages?.length !== 0 ? props?.messages?.sort((a, b) => new Date(a?.data()?.date.toDate()) - new Date(b?.data()?.date.toDate())).map((message, index) => (message?.data() ? message?.data()?.chatId === props?.currentChat?.id ? <Message {...props} key={message?.id} message={message} id={props?.id} index={index} myIndex={message.data().id === props.account.id && message.data()} /> : undefined : undefined)) : undefined}</div>
    </div>
  );
};

export default Messages;

// {props?.messages?.length > 0 ? props?.messages?.find((message) => (message?.data()?.chatId === currentChat?.id ? <Messages {...props} key={message.id} message={message} id={id} /> : undefined)) : <></>}
