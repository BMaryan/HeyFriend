import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../types/types";
import { ChatDetails, DefaultViewMessages, Head } from "../../utils/helperForChat/helperForChat";
import Messages from "./Messages/Messages";
import styles from "./Chat.module.scss";
import Dialogs from "./Dialogs/Dialogs";

interface ChatPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  id: string;
  addMessageThunk: (message: MessageType) => void;
  deleteMessageThunk: (message: MessageType) => void;
}

const Chat = (props: ChatPropsType) => {
  const [toggleDetails, setToggleDetails] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  const currentChat: FirebaseType<ChatType> | undefined = props.id ? props?.chats?.find((chat: ChatType) => chat?.id === props.id) : undefined;
  const chatWithAccount: FirebaseType<AccountType> | undefined = props?.accounts?.find((account: FirebaseType<AccountType>) => (currentChat?.data()?.participants ? currentChat?.data()?.participants?.find((participant: ParticipantsOfChatType) => (account?.id === participant?.id && account?.id !== props?.account?.id ? account : undefined)) : undefined));

  return (
    <div className={styles.chat}>
      {/* dialogs content */}
      <div className={styles.dialogs}>
        <Head account={props.account} toggleShowContent={true} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} />

        {/* field search people */}
        <div className={styles.wrapper_input}>
          <input type="search" value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} placeholder="Search contact" />
        </div>

        <Dialogs accounts={props.accounts} account={props.account} chats={props.chats} messages={props.messages} searchValue={searchValue} />
      </div>

      {/* messages content */}
      <div className={styles.messages}>
        {props.id ? <Head account={props.account} toggleShowContent={false} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} /> : undefined}

        {props.id ? !toggleDetails ? <ChatDetails chatWithAccount={chatWithAccount} currentChat={currentChat} /> : <Messages account={props.account} messages={props.messages} id={props.id} currentChat={currentChat} chatWithAccount={chatWithAccount} addMessageThunk={props.addMessageThunk} deleteMessageThunk={props.deleteMessageThunk} /> : undefined}

        {!props.id && <DefaultViewMessages />}
      </div>
    </div>
  );
};

export default Chat;
