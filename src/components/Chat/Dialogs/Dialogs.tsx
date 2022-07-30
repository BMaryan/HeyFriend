import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../../types/types";
import styles from "./Dialogs.module.scss";
import Dialog from "./Dialog/Dialog";

interface DialogsPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  searchValue: string;
  loading: boolean;
}

const Dialogs = (props: DialogsPropsType) => {
  const foundAccount: Array<FirebaseType<AccountType>> = props.accounts.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(props.searchValue.toLocaleLowerCase().trim(), 0) && account.id !== props.account?.id);
  const searchChat: Array<FirebaseType<ChatType>> = props.chats.filter((chat: FirebaseType<ChatType>) => foundAccount.find((account: FirebaseType<AccountType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => account.id === participant.id && account.id !== props.account?.id)));
  const currentChatsOfAccount: Array<FirebaseType<ChatType>> = props.chats?.filter((chat: FirebaseType<ChatType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => participant.id === props.account?.id));
  const checkArray = props.searchValue ? searchChat : currentChatsOfAccount;

  // test check loading dialogs
  // const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 6000);
  // }, []);

  return (
    <div className={styles.dialogs}>
      {currentChatsOfAccount.length > 0 ? (
        checkArray.map((chat: FirebaseType<ChatType>) => <Dialog key={chat.id} accounts={props.accounts} account={props.account} messages={props.messages} chat={chat} loading={props.loading} searchValue={props.searchValue} />)
      ) : (
        <div className={styles.chats_wrapper_text}>
          <div className={styles.chats_wrapper_title}>Add a chat</div>
          <div className={styles.chats_wrapper_subtitle}>Sorry, this content is not yet available</div>
        </div>
      )}
    </div>
  );
};

export default Dialogs;
