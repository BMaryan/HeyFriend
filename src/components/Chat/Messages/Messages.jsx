import React from "react";
import styles from "./Messages.module.css";
import Message from "./Message/Message";

const defaultViewMessages = () => {
	return <div>Default VIew Messages</div>;
};

const Messages = props => {
	let id = props.match.params.id;

	return (
		<div className={styles.messages}>
			<Message id={id} />
		</div>
	);
};

export default Messages;
