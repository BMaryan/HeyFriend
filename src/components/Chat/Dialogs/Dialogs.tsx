import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../types/types";
import { CircularProgress } from "@mui/material";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";

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
  const currentChatsOfAccount: Array<FirebaseType<ChatType>> = props.chats?.filter((chat: FirebaseType<ChatType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => participant.id === props.account?.id));

  const currentAccountsOfChats: Array<FirebaseType<AccountType>> = props.accounts?.filter((account: FirebaseType<AccountType>) => currentChatsOfAccount.find((chat: FirebaseType<ChatType>) => chat.data().participants.find((participant: ParticipantsOfChatType) => participant.id === account.id && participant.id !== props.account?.id)));

  // check by surname and name of account
  const checkAccount: Array<FirebaseType<AccountType>> = currentAccountsOfChats.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(props.searchValue.toLocaleLowerCase().trim(), 0));

  // searched chat by searching
  const search: Array<FirebaseType<ChatType>> = currentChatsOfAccount.filter((chat: FirebaseType<ChatType>) => checkAccount.find((account: FirebaseType<AccountType>) => chat.data().participants.find((participant: ParticipantsOfChatType) => account.id === participant.id)));

  // get group where participants are more than 2
  const getSearchedGroups: Array<FirebaseType<ChatType>> = search.filter((chat: FirebaseType<ChatType>) => chat.data().participants.length > 2);

  const checkArray = props.searchValue ? search : currentChatsOfAccount;

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
        ? checkArray.sort((a: FirebaseType<ChatType>, b: FirebaseType<ChatType>) => b?.data()?.dateCreated.toDate().getTime() - a?.data()?.dateCreated.toDate().getTime()).map((chat: FirebaseType<ChatType>) => <Dialog key={chat.id} accounts={props.accounts} account={props.account} messages={props.messages} getSearchedGroups={getSearchedGroups} messageValue={props.messageValue} chat={chat} loading={props.loading} searchValue={props.searchValue} chatWithAccounts={props.chatWithAccounts} currentChatsOfAccount={currentChatsOfAccount} />)
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
