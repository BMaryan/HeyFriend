import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../types/types";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";
import { CircularProgress } from "@mui/material";

interface DialogsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  messageValue: string;
  searchValue: string;
  loading: boolean;
  chatWithAccounts: Array<FirebaseType<AccountType>>;
}

const Dialogs = (props: DialogsPropsType) => {
  const foundAccount: Array<FirebaseType<AccountType>> = props.accounts.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(props.searchValue.toLocaleLowerCase().trim(), 0) && account.id !== props.account?.id);

  const foundGroup: Array<FirebaseType<ChatType>> = props.chats.filter((chat: FirebaseType<ChatType>) => chat.data()?.title?.toLocaleLowerCase().trim().includes(props.searchValue.toLocaleLowerCase().trim(), 0));

  const searchChat: Array<FirebaseType<ChatType>> = props.chats.filter((chat: FirebaseType<ChatType>) => {
    const resAccount = foundAccount.find((account: FirebaseType<AccountType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => account.id === participant.id && account.id !== props.account?.id));
    const resGroup = foundGroup.find((chatOfGroup: FirebaseType<ChatType>) => chat.id === chatOfGroup.id);

    return resAccount || resGroup;
  });

  const currentChatsOfAccount: Array<FirebaseType<ChatType>> = props.chats?.filter((chat: FirebaseType<ChatType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => participant.id === props.account?.id));
  const checkArray = props.searchValue ? searchChat : currentChatsOfAccount;

  if (checkArray.length === 0 && props.loading) {
    return (
      <div className="gl_wrapper_loading">
        <CircularProgress className="loading" />
      </div>
    );
  }

  return (
    <div className={styles.dialogs}>
      {currentChatsOfAccount.length > 0
        ? checkArray.sort((a: FirebaseType<ChatType>, b: FirebaseType<ChatType>) => b?.data()?.dateCreated.toDate().getTime() - a?.data()?.dateCreated.toDate().getTime()).map((chat: FirebaseType<ChatType>) => <Dialog key={chat.id} accounts={props.accounts} account={props.account} messages={props.messages} messageValue={props.messageValue} chat={chat} loading={props.loading} searchValue={props.searchValue} chatWithAccounts={props.chatWithAccounts} currentChatsOfAccount={currentChatsOfAccount} />)
        : !props.loading && (
            <div className={styles.chats_wrapper_text}>
              <div className={styles.chats_wrapper_title}>Add a chat</div>
              <div className={styles.chats_wrapper_subtitle}>Sorry, this content is not yet available</div>
            </div>
          )}
    </div>
  );
};

export default Dialogs;
