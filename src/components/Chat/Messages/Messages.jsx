import React from "react";
import styles from "./Messages.module.css";
import Message from "./Message/Message";

const Messages = props => {
	let id = Number(props.match.params.id);

	return (
		<div className={styles.messages}>
			<div className={styles.messages_content}>
				{id ? (
					props.chat.messages.map(el => <Message key={el.id} el={el} accounts={props.accounts} id={id} account={props.account} />)
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Messages;
