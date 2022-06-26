import React from "react";
import { AccountType, ChatType, MessageType, ParticipantsOfChatType } from "../../types/types";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileConstant } from "../../core/constants/constants";
import { Head } from "../../utils/helperForChat/helperForChat";
import Messages from "./Messages/Messages";
import { NavLink } from "react-router-dom";
import Dialogs from "./Dialogs/Dialogs";
import styles from "./Chat.module.scss";

interface ChatPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  chats: Array<ChatType>;
  messages: Array<MessageType>;
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

  const currentChat: ChatType | undefined = props.id ? props?.chats?.find((chat: ChatType) => chat?.id === props.id) : undefined;
  const chatWithAccount: AccountType | undefined = props?.accounts?.find((account: AccountType) => (currentChat?.data()?.participants?.length > 0 ? currentChat?.data()?.participants?.find((participant: ParticipantsOfChatType) => (account?.id === participant?.id && account?.id !== props?.account?.id ? account : undefined)) : undefined));

  let onSubmit = (formData: { send_message: string }) => {
    props.addMessageThunk({
      id: props?.account?.id,
      chatId: currentChat?.id,
      message: formData?.send_message,
      date: new Date(),
    });
  };

  return (
    <div className={styles.chat}>
      <div className={styles.dialogs}>
        <Head account={props.account} toggleShowContent={true} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} />
        <div className={styles.dialogs_content}>
          <Dialogs accounts={props.accounts} account={props.account} chats={props.chats} messages={props.messages} />
        </div>
      </div>

      <div className={toggleDetails ? styles.messages_noDetails : styles.messages_details}>
        {props.id ? <Head account={props.account} toggleShowContent={false} toggleDetails={toggleDetails} chatWithAccount={chatWithAccount} setToggleDetails={setToggleDetails} /> : <></>}

        <div className={props.id ? styles.messages_content : styles.messages_content_defaultView}>
          <Messages account={props.account} messages={props.messages} id={props.id} currentChat={currentChat} chatWithAccount={chatWithAccount} />

          {/* {props.id ? <ChatReduxForm onSubmit={(onSubmit)} /> : <></>} */}
          {!props.id ? <DefaultViewMessages /> : <></>}
        </div>

        {/* toggle container which shows when onClick on button  */}
        {props.id ? (
          <div key={chatWithAccount?.id} className={toggleDetails ? styles.details_hidden : styles.details_show}>
            <NavLink key={chatWithAccount?.id} to={`${profileConstant.path}/${chatWithAccount?.id}`} className={styles.contact_link}>
              <div className={styles.wrapper_picture}>{chatWithAccount?.data() ? <img src={chatWithAccount?.data()?.avatar ? chatWithAccount?.data()?.avatar : defaultAvatar} alt="" /> : <></>}</div>
              <div className={styles.fullName}>{chatWithAccount?.data() ? chatWithAccount?.data()?.surname + " " + chatWithAccount?.data()?.name : <></>}</div>
            </NavLink>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Chat;
