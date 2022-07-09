import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType } from "../../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";

interface DialogsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
}

const Dialogs = (props: DialogsPropsType) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.wrapper_input}>
        <input type="search" placeholder="Search contact" />
        <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
      </div>
      <div className={styles.chats}>
        {props?.chats?.length > 0 ? (
          props?.chats.map((chat: FirebaseType<ChatType>) => <Dialog key={chat.id} accounts={props.accounts} account={props.account} messages={props.messages} chat={chat} />)
        ) : (
          <div className={styles.chats_wrapper_text}>
            <div className={styles.chats_wrapper_title}>Work in progress</div>
            <div className={styles.chats_wrapper_subtitle}>Sorry, this content is not yet available</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialogs;
