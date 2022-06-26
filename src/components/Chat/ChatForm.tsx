import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./Chat.module.scss";

interface ChatFormPropsType {}

const ChatForm = (props: ChatFormPropsType) => {
  return (
    <form className={styles.form}>
      <Field className={styles.field} name="send_message" type="text" placeholder="Your message..." component="input" />
      <button>Send</button>
    </form>
  );
};

const ChatReduxForm = reduxForm({ form: "messages" })(ChatForm);

export default ChatReduxForm;
