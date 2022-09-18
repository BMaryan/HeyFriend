/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AccountType, ChatType, FirebaseType, HistoryType, ParticipantsOfChatType } from "../../types/types";
import { ChatDetails, DefaultViewMessages, Head } from "../../utils/helperForChat/helperForChat";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ChatContainerPropsType } from "./ChatContainer";
import GoBackHead from "../common/GoBackHead/GoBackHead";
import InfoIcon from "@mui/icons-material/Info";
import Messages from "./Messages/Messages";
import styles from "./Chat.module.scss";
import Dialogs from "./Dialogs/Dialogs";
import Media from "react-media";

interface ChatPropsType extends ChatContainerPropsType {
  id: string;
  history: HistoryType;
  messageValue: string;
  currentChat: FirebaseType<ChatType> | undefined;
  setTyping: (typing: string | null) => void;
  setMessageValue: (messageValue: string) => void;
}

const Chat = (props: ChatPropsType) => {
  const [toggleDetails, setToggleDetails] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const chatWithAccounts: Array<FirebaseType<AccountType>> = props?.accounts?.filter((account: FirebaseType<AccountType>) => props.currentChat?.data()?.participants?.find((participant: ParticipantsOfChatType) => account?.id === participant?.id && account?.id !== props?.account?.id));
  const typingOfAccount: FirebaseType<AccountType> | undefined = props.accounts.find((account: FirebaseType<AccountType>) => account.id === props.currentChat?.data()?.typing && account.id !== props.account?.id);

  // close details of chat when pathname changed
  React.useEffect(() => {
    setToggleDetails(true);
  }, [props.history.location.pathname]);

  React.useEffect(() => {
    if (!toggleDetails) {
      props.setMessageValue("");
    }
  }, [toggleDetails]);

  return (
    <div className={styles.chat}>
      {/* dialogs content */}
      <div className={`${styles.dialogs} ${props.id && styles.mobile_dialogs}`}>
        <Head accounts={props.accounts} account={props.account} chats={props.chats} typingOfAccount={typingOfAccount} toggleShowContent={true} toggleDetails={toggleDetails} currentChat={props.currentChat} chatWithAccounts={chatWithAccounts} history={props.history} setToggleDetails={setToggleDetails} createChatThunk={props.createChatThunk} />

        {/* field search people */}
        <div className={styles.wrapper_input}>
          <input type="search" value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} placeholder="Search contact" />
        </div>

        <Dialogs accounts={props.accounts} account={props.account} chats={props.chats} messages={props.messages} loading={props.chatsLoading} messageValue={props.messageValue} searchValue={searchValue} chatWithAccounts={chatWithAccounts} />
      </div>

      {/* messages content */}
      <div className={`${styles.messages}`}>
        {props.id && !props.messagesLoading && <Media query={{ maxWidth: 399 }}>{(matches) => (matches ? <GoBackHead history={props.history} title={chatWithAccounts.length === 1 ? chatWithAccounts[0].data().surname + " " + chatWithAccounts[0].data().name : props.currentChat?.data().title} endIcon={toggleDetails ? <InfoOutlinedIcon /> : <InfoIcon />} onClickIcon={() => setToggleDetails(!toggleDetails)} /> : <Head accounts={props.accounts} account={props.account} chats={props.chats} typingOfAccount={typingOfAccount} toggleShowContent={false} toggleDetails={toggleDetails} currentChat={props.currentChat} chatWithAccounts={chatWithAccounts} history={props.history} setToggleDetails={setToggleDetails} createChatThunk={props.createChatThunk} />)}</Media>}

        {props.id ? !toggleDetails ? <ChatDetails accounts={props.accounts} account={props.account} messages={props.messages} chatWithAccounts={chatWithAccounts} currentChat={props.currentChat} history={props.history} deleteChatThunk={props.deleteChatThunk} deleteMessageThunk={props.deleteMessageThunk} /> : <Messages account={props.account} messages={props.messages} id={props.id} currentChat={props.currentChat} messageValue={props.messageValue} chatWithAccounts={chatWithAccounts} loading={props.messagesLoading} setTyping={props.setTyping} setMessageValue={props.setMessageValue} addMessageThunk={props.addMessageThunk} updateMessageThunk={props.updateMessageThunk} deleteMessageThunk={props.deleteMessageThunk} /> : undefined}

        {!props.id && <DefaultViewMessages />}
      </div>
    </div>
  );
};

export default Chat;
