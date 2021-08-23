import React from "react";
import styles from "./Messages.module.css";
import Message from "./Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const DefaultViewMessages = props => {
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

const Messages = props => {
	let id = props.match.params.id;

	return (
		<div className={styles.messages}>
			<div className={styles.messages_content}>{id ? <Message id={id} /> : DefaultViewMessages()}</div>
		</div>
	);
};

export default Messages;
