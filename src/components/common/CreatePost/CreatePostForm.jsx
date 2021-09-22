import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "./CreatePost.module.css";

const CreatePost = props => {
	return (
		<form className={styles.form} onSubmit={props.handleSubmit}>
			<Field
				// onClick={() => props.setCreatePostContainer(true)}
				name='create_post'
				type='text'
				className={styles.input}
				placeholder="What's on your mind?"
				component='input'
			/>
		</form>
	);
};

const CreatePostReduxForm = reduxForm({ form: "create_post" })(CreatePost);

export default CreatePostReduxForm;
