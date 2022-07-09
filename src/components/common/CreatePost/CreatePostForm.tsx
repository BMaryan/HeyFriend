import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { CreatePostFormDataType } from "./CreatePost";
import styles from "./CreatePost.module.scss";

interface CreatePostFormPropsType {}

const CreatePostForm = (props: InjectedFormProps<CreatePostFormDataType, CreatePostFormPropsType> & CreatePostFormPropsType) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field name="create_post" type="text" className={styles.field} placeholder="What's on your mind?" component="textarea" />
    </form>
  );
};

const CreatePostReduxForm = reduxForm<CreatePostFormDataType, CreatePostFormPropsType>({ form: "create_post" })(CreatePostForm);

export default CreatePostReduxForm;
