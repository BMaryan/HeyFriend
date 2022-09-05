import React from "react";
import { AccountType, ChatType, FirebaseType, MediaOfMessageType, MessageType } from "../../../types/types";
import { ContainerOfMessageAndMedia } from "../../../utils/helperForChat/helperForChat";
import MessagesReduxForm from "./MessagesForm";
import styles from "./Messages.module.scss";
import Message from "./Message/Message";
import { fb } from "../../../firebase";
import { CircularProgress } from "@mui/material";

interface MessagesPropsType {
  id: string;
  account: AccountType | null;
  messages: Array<FirebaseType<MessageType>>;
  currentChat: FirebaseType<ChatType> | undefined;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
  messageValue: string;
  loading: boolean;
  setTyping: (typing: string | null) => void;
  setMessageValue: (messageValue: string) => void;
  addMessageThunk: (message: MessageType) => void;
  updateMessageThunk: (message: MessageType) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

export interface MessagesFormDataType {
  [send_message: string]: string;
}

const Messages = (props: MessagesPropsType) => {
  const scrollContent = React.createRef<any>();
  const [open, setOpen] = React.useState(false);
  const [editMessage, setEditMessage] = React.useState<MessageType | null>(null);
  const [medias, setMedias] = React.useState<Array<MediaOfMessageType>>([]);
  const currentMessagesOfChat: Array<FirebaseType<MessageType>> = props.messages.filter((message: FirebaseType<MessageType>) => message.data().chatId === props.currentChat?.id);

  // scroll from down by default
  React.useEffect(() => {
    scrollContent?.current?.scrollTo(0, scrollContent?.current?.scrollHeight);
  });

  // open container add message and media when medias are more than 0
  React.useEffect(() => {
    if (medias.length > 0) {
      setOpen(true);
    }
  }, [medias]);

  const onSubmit = (formData: MessagesFormDataType) => {
    !editMessage
      ? props.addMessageThunk({
          id: "",
          accountId: props?.account?.id,
          chatId: props.currentChat?.id,
          message: formData[`send_message_${props.currentChat?.id}_${props.account?.id}`] || props.messageValue,
          medias: medias,
          date: fb.Timestamp.now(),
        })
      : props.updateMessageThunk({ ...editMessage });

    setEditMessage(null);
    props.setMessageValue("");
    Object.keys(formData).map((item) => formData[item]);
  };

  // get id from formData (send_message_${props.currentChat?.id}_${props.account?.id}) and set to setTyping
  const onChange = (formData: MessagesFormDataType) => {
    props.setTyping(Object.keys(formData)[0]?.split("_")[Object.keys(formData)[0]?.split("_").length - 1] || null);
  };

  if (props.loading) {
    return (
      <div className="gl_wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      {currentMessagesOfChat.length > 0 ? (
        <div className={styles.messages_content} ref={scrollContent}>
          {currentMessagesOfChat?.sort((a: FirebaseType<MessageType>, b: FirebaseType<MessageType>) => a?.data()?.date.toDate().getTime() - b?.data()?.date.toDate().getTime()).map((message: FirebaseType<MessageType>, index: number) => (message?.data() ? message?.data()?.chatId === props?.currentChat?.id ? <Message key={message?.id} account={props.account} message={message} messageValue={props.messageValue} setMessageValue={props.setMessageValue} prevMessage={currentMessagesOfChat[index - 1]} chatWithAccounts={props.chatWithAccounts} setEditMessage={setEditMessage} deleteMessageThunk={props.deleteMessageThunk} /> : undefined : undefined))}
        </div>
      ) : (
        <div className={styles.default_content}>{!props.loading && "Default content"}</div>
      )}

      <MessagesReduxForm account={props.account} currentChat={props.currentChat} messageValue={props.messageValue} medias={medias} editMessage={editMessage} setMessageValue={props.setMessageValue} setMedias={setMedias} onSubmit={onSubmit} onChange={onChange} setEditMessage={setEditMessage} />

      {/* toogle container for adding medias */}
      {medias.length > 0 && <ContainerOfMessageAndMedia messageValue={props.messageValue} setMessageValue={props.setMessageValue} medias={medias} setMedias={setMedias} open={open} setOpen={setOpen} onSubmit={onSubmit} />}
    </div>
  );
};

export default Messages;
