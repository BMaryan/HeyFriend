import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType } from "../../../types/types";
import MessagesReduxForm from "./MessagesForm";
import styles from "./Messages.module.scss";
import Message from "./Message/Message";

interface MessagesPropsType {
  id: string;
  account: AccountType | null;
  messages: Array<FirebaseType<MessageType>>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccount: FirebaseType<AccountType> | undefined;
  addMessageThunk: (message: MessageType) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export interface MessagesFormDataType {
  [send_message: string]: string;
}

const Messages = (props: MessagesPropsType) => {
  const scrollContent = React.createRef<any>();
  const [messageValue, setMessageValue] = React.useState("");
  const areMessages: Array<FirebaseType<MessageType>> = props.messages.filter((message: FirebaseType<MessageType>) => message.data().chatId === props.currentChat?.id);

  // scroll from down by default
  React.useEffect(() => {
    scrollContent?.current?.scrollTo(0, scrollContent?.current?.scrollHeight);
  });

  const onSubmit = (formData: MessagesFormDataType) => {
    console.log(formData[`send_message_${props.account?.id}`]);

    // props.addMessageThunk({
    //   id: props.account?.id,
    //   chatId: props.currentChat?.id,
    //   message: `${formData?.send_message}_${props.account?.id}`,
    //   date: new Date(),
    // });
  };

  return (
    <div className={styles.messages}>
      {areMessages.length > 0 ? (
        <div className={styles.messages_content} ref={scrollContent}>
          {props?.messages?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime()).map((message: FirebaseType<MessageType>, index: number) => (message?.data() ? message?.data()?.chatId === props?.currentChat?.id ? <Message key={message?.id} account={props.account} message={message} messageValue={messageValue} setMessageValue={setMessageValue} prevMessage={props.messages[index - 1]} chatWithAccount={props.chatWithAccount} deleteMessageThunk={props.deleteMessageThunk} /> : undefined : undefined))}
        </div>
      ) : (
        <div className={styles.default_content}>Default content</div>
      )}

      <MessagesReduxForm account={props.account} messageValue={messageValue} setMessageValue={setMessageValue} onSubmit={onSubmit} />
    </div>
  );
};

export default Messages;
