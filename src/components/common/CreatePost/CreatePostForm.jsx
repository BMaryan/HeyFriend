import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./CreatePost.module.scss";

const CreatePost = (props) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field name="create_post" type="text" className={styles.field} placeholder="What's on your mind?" component="textarea" />
    </form>
  );
};

const CreatePostReduxForm = reduxForm({ form: "create_post" })(CreatePost);

export default CreatePostReduxForm;
