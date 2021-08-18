import React from "react";
import styles from "./Chat.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";

const Chat = props => {
	return (
		<div className={styles.chat}>
			<div className={styles.dialogs}>
				<Dialogs users={props.users} profileAuthorizationData={props.profileAuthorizationData} />
			</div>
			<div className={styles.messages}>
				<Messages profileAuthorizationData={props.profileAuthorizationData} />
			</div>
		</div>
	);
};

export default Chat;
