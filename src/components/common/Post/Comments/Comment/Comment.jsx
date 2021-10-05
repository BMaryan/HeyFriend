import React from "react";
import styles from "./Comment.module.css";
import CommentReduxForm from "./CommentForm";

const Comment = props => {
	return (
		<div className={styles.comment}>
			<CommentReduxForm />
		</div>
	);
};

export default Comment;
