import React from "react";
import { AccountType, ChatType, FirebaseType, HistoryType, ParticipantsOfChatType } from "../../types/types";
import { ChatDetails, DefaultViewMessages, Head } from "../../utils/helperForChat/helperForChat";
import { ChatContainerPropsType } from "./ChatContainer";
import Messages from "./Messages/Messages";
import styles from "./Chat.module.scss";
import Dialogs from "./Dialogs/Dialogs";

interface ChatPropsType extends ChatContainerPropsType {
  id: string;
  history: HistoryType;
  currentChat: FirebaseType<ChatType> | undefined;
  setTyping: (typing: string | null) => void;
}

const Chat = (props: ChatPropsType) => {
  const [toggleDetails, setToggleDetails] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  const chatWithAccount: FirebaseType<AccountType> | undefined = props?.accounts?.find((account: FirebaseType<AccountType>) => (props.currentChat?.data()?.participants ? props.currentChat?.data()?.participants?.find((participant: ParticipantsOfChatType) => (account?.id === participant?.id && account?.id !== props?.account?.id ? account : undefined)) : undefined));
  const typingOfAccount: FirebaseType<AccountType> | undefined = props.accounts.find((account: FirebaseType<AccountType>) => account.id === props.currentChat?.data()?.typing && account.id !== props.account?.id);

  // close details of chat when pathname changed
  React.useEffect(() => {
    setToggleDetails(true);
  }, [props.history.location.pathname]);

  return (
    <div className={styles.chat}>
      {/* dialogs content */}
      <div className={styles.dialogs}>
        <Head account={props.account} typingOfAccount={typingOfAccount} toggleShowContent={true} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} />

        {/* field search people */}
        <div className={styles.wrapper_input}>
          <input type="search" value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} placeholder="Search contact" />
        </div>

        <Dialogs accounts={props.accounts} account={props.account} chats={props.chats} messages={props.messages} loading={props.loading} searchValue={searchValue} />
      </div>

      {/* messages content */}
      <div className={styles.messages}>
        {props.id ? <Head account={props.account} typingOfAccount={typingOfAccount} toggleShowContent={false} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} /> : undefined}

        {props.id ? !toggleDetails ? <ChatDetails messages={props.messages} chatWithAccount={chatWithAccount} currentChat={props.currentChat} history={props.history} deleteChatThunk={props.deleteChatThunk} deleteMessageThunk={props.deleteMessageThunk} /> : <Messages account={props.account} messages={props.messages} id={props.id} currentChat={props.currentChat} chatWithAccount={chatWithAccount} loading={props.loading} setTyping={props.setTyping} addMessageThunk={props.addMessageThunk} updateMessageThunk={props.updateMessageThunk} deleteMessageThunk={props.deleteMessageThunk} /> : undefined}

        {!props.id && <DefaultViewMessages />}
      </div>
    </div>
  );
};

export default Chat;
