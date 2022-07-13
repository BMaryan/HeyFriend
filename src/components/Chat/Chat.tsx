import React from "react";
import { AccountType, ChatType, FirebaseType, MessageType, ParticipantsOfChatType } from "../../types/types";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "../../utils/helperForChat/helperForChat";
import Messages from "./Messages/Messages";
import Dialogs from "./Dialogs/Dialogs";
import styles from "./Chat.module.scss";

interface ChatPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  chats: Array<FirebaseType<ChatType>>;
  messages: Array<FirebaseType<MessageType>>;
  id: string;
  addMessageThunk: any;
}

interface DefaultViewMessagesPropsType {}

const DefaultViewMessages = (props: DefaultViewMessagesPropsType) => {
  return (
    <div className={styles.default_view_messages}>
      <div className={styles.wrapper_icon}>
        <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
      </div>
      <div className={styles.title}>Your Messages</div>
      <div className={styles.subtitle}>Send private photos and messages to a friend or group</div>
      <div className={styles.wrapper_button}>
        <button>Send Message</button>
      </div>
    </div>
  );
};

const Chat = (props: ChatPropsType) => {
  const [toggleDetails, setToggleDetails] = React.useState(true);

  const currentChat: FirebaseType<ChatType> | undefined = props.id ? props?.chats?.find((chat: ChatType) => chat?.id === props.id) : undefined;
  const chatWithAccount: FirebaseType<AccountType> | undefined = props?.accounts?.find((account: FirebaseType<AccountType>) => (currentChat?.data()?.participants ? currentChat?.data()?.participants?.find((participant: ParticipantsOfChatType) => (account?.id === participant?.id && account?.id !== props?.account?.id ? account : undefined)) : undefined));
  const areChats: Array<ParticipantsOfChatType> = props.chats?.filter((chat: FirebaseType<ChatType>) => chat.data().participants?.find((participant: ParticipantsOfChatType) => participant.id === props.account?.id));

  return (
    <div className={styles.chat}>
      {/* dialogs content */}
      <div className={styles.dialogs}>
        <Head account={props.account} toggleShowContent={true} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} />

        {/* field search people */}
        <div className={styles.wrapper_input}>
          <input type="search" placeholder="Search contact" />
          <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
        </div>

        <Dialogs accounts={props.accounts} account={props.account} chats={props.chats} messages={props.messages} areChats={areChats} />
      </div>

      {/* messages content */}
      <div className={styles.messages}>
        {props.id ? <Head account={props.account} toggleShowContent={false} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} /> : undefined}

        {props.id ? !toggleDetails ? <div>Test</div> : <Messages account={props.account} messages={props.messages} id={props.id} currentChat={currentChat} chatWithAccount={chatWithAccount} addMessageThunk={props.addMessageThunk} /> : undefined}

        {!props.id && <DefaultViewMessages />}
      </div>
    </div>
  );
};

export default Chat;

{
  /* toggle container which shows when onClick on button  */
}
{
  /* // {props.id ? ( */
}
{
  /* //   <div key={chatWithAccount?.id} className={toggleDetails ? styles.details_hidden : styles.details_show}>
        //     <NavLink key={chatWithAccount?.id} to={`${profileConstant.path}/${chatWithAccount?.id}`} className={styles.contact_link}>
        //       <div className={styles.wrapper_picture}>{chatWithAccount?.data() ? <img src={chatWithAccount?.data()?.avatar ? chatWithAccount?.data()?.avatar : defaultAvatar} alt="" /> : <></>}</div>
        //       <div className={styles.fullName}>{chatWithAccount?.data() ? chatWithAccount?.data()?.surname + " " + chatWithAccount?.data()?.name : <></>}</div>
        //     </NavLink>
        //   </div>
        // ) : (
        //   <></>
        // )} */
}
