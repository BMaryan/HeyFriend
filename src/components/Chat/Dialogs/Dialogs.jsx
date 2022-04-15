import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";

const Dialogs = (props) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.wrapper_input}>
        <input type="search" placeholder="Search contact" />
        <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
      </div>
      <div className={styles.chats}>
        {props.chats && props.chats.length > 0 ? (
          props.chats.map((chat) => <Dialog key={chat.id} chat={chat} account={props.account} />)
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
