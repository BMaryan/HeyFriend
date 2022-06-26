import React from "react";
import { AccountType, ChatType, MessageType } from "../../../types/types";
import { CircularProgress } from "@mui/material";
import styles from "./Messages.module.scss";
import Message from "./Message/Message";
import ChatReduxForm from "../ChatForm";

interface MessagesPropsType {
  id: string;
  account: AccountType | null;
  messages: Array<MessageType>;
  currentChat: ChatType | undefined;
  chatWithAccount: ChatType | undefined;
}

const Messages = (props: MessagesPropsType) => {
  if (!props.messages) {
    return (
      <div className="wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      <div className={styles.messages_content}>{props?.messages?.length !== 0 ? props?.messages?.sort((a: MessageType, b: MessageType) => a?.data()?.date.toDate() - b?.data()?.date.toDate()).map((message: MessageType, index: number) => (message?.data() ? message?.data()?.chatId === props?.currentChat?.id ? <Message key={message?.id} message={message} account={props.account} chatWithAccount={props.chatWithAccount} /> : undefined : undefined)) : undefined}</div>

      {props.id ? <ChatReduxForm /> : <></>}
    </div>
  );
};

export default Messages;
