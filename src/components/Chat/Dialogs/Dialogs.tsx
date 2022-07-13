import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../types/types";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";

interface DialogsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  areChats: Array<ParticipantsOfChatType>;
}

const Dialogs = (props: DialogsPropsType) => {
  return (
    <div className={styles.dialogs}>
      {props.areChats.length > 0 ? (
        props.chats.map((chat: FirebaseType<ChatType>) => <Dialog key={chat.id} accounts={props.accounts} account={props.account} messages={props.messages} chat={chat} />)
      ) : (
        <div className={styles.chats_wrapper_text}>
          <div className={styles.chats_wrapper_title}>Work in progress</div>
          <div className={styles.chats_wrapper_subtitle}>Sorry, this content is not yet available</div>
        </div>
      )}
    </div>
  );
};

export default Dialogs;
