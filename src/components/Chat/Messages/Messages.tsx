import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType } from "../../../types/types";
import { CircularProgress } from "@mui/material";
import MessagesReduxForm from "./MessagesForm";
import styles from "./Messages.module.scss";
import Message from "./Message/Message";

interface MessagesPropsType {
  id: string;
  account: AccountType | null;
  messages: Array<FirebaseType<MessageType>>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  addMessageThunk: any;
}

export interface MessagesFormDataType {
  send_message: string;
}

const Messages = (props: MessagesPropsType) => {
  const el = React.createRef<any>();

  const onSubmit = (formData: MessagesFormDataType) => {
    props.addMessageThunk({
      id: props.account?.id,
      chatId: props.currentChat?.id,
      message: formData?.send_message,
      date: new Date(),
    });
  };

  React.useEffect(() => {
    el?.current?.scrollTo(0, el?.current?.scrollHeight);
  });

  if (!props.messages) {
    return (
      <div className="wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      {props?.messages?.length !== 0 ? (
        <div className={styles.messages_content} ref={el}>
          {props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime()).map((message: FirebaseType<MessageType>, index: number) => (message?.data() ? message?.data()?.chatId === props?.currentChat?.id ? <Message key={message?.id} message={message} account={props.account} chatWithAccount={props.chatWithAccount} /> : undefined : undefined))}
        </div>
      ) : undefined}

      <MessagesReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Messages;
