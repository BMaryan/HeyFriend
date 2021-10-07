import React from "react";
import styles from "./Comment.module.css";
import CommentReduxForm from "./CommentForm";

const Comment = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	console.log(props);

	return (
		<div className={styles.comment}>
			<CommentReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default Comment;
