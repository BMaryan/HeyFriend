import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Chat.module.css";

const ChatForm = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<Field className={styles.field} name='send_message' type='text' placeholder='Your message...' component='input' />
			<button>Send</button>
		</form>
	);
};

let ChatReduxForm = reduxForm({ form: "messages" })(ChatForm);

export default ChatReduxForm;
