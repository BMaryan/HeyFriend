import React from "react";
import styles from "./Chat.module.scss";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import ChatReduxForm from "./ChatForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Head } from "../../utils/helperForChat/helperForChat";
import { profileConstant } from "../../core/constants/constants";

const DefaultViewMessages = (props) => {
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

const Chat = (props) => {
  let [toggleDetails, setToggleDetails] = React.useState(true);
  let id = props.match.params.id;

  let currentChat = id ? props?.chats?.find((chat) => chat?.id === id) : undefined;
  let chatWithAccount = props?.accounts?.find((account) => (currentChat?.data()?.participants?.length > 0 ? currentChat?.data()?.participants?.find((participant) => (account?.id === participant?.id && account?.id !== props?.account?.id ? account : undefined)) : undefined));

  let onSubmit = (formData) => {
    // if (formData.send_message) {
    props.addMessageThunk({
      id: props?.account?.id,
      chatId: currentChat?.id,
      message: formData?.send_message,
      date: new Date(),
    });
    // }
    // props.addMessage(id, props.account.id, formData.send_message);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.dialogs}>
        <Head {...props} id={id} chatWithAccount={chatWithAccount} toggleShowContent={true} />
        <div className={styles.dialogs_content}>
          <Dialogs {...props} id={id} currentChat={currentChat} chatWithAccount={chatWithAccount} />
        </div>
      </div>

      <div className={toggleDetails ? styles.messages_noDetails : styles.messages_details}>
        {id ? <Head {...props} id={id} chatWithAccount={chatWithAccount} toggleShowContent={false} toggleDetails={toggleDetails} setToggleDetails={setToggleDetails} /> : <></>}

        <div className={id ? styles.messages_content : styles.messages_content_defaultView}>
          <Messages {...props} id={id} currentChat={currentChat} chatWithAccount={chatWithAccount} />

          {id ? <ChatReduxForm onSubmit={onSubmit} /> : <></>}
          {!id ? <DefaultViewMessages /> : <></>}
        </div>

        {/* toggle container which shows when onClick on button  */}
        {id ? (
          <div key={chatWithAccount?.id} className={toggleDetails ? styles.details_hidden : styles.details_show}>
            <NavLink key={chatWithAccount?.id} to={chatWithAccount ? `${profileConstant.path}/${chatWithAccount?.id}` : `${profileConstant.path}/${chatWithAccount?.id}`} className={styles.contact_link}>
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
