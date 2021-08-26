import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./CreatePost.module.css";

const CreatePost = props => {
	console.log(props);
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<Field name='create_post' type='text' className={styles.input} component='input' />
			<button className={styles.button}>Send</button>
		</form>
	);
};

const CreatePostReduxForm = reduxForm({ form: "create_post" })(CreatePost);

export default CreatePostReduxForm;
