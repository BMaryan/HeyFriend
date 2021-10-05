import React from "react";
import styles from "./Comment.module.css";
import { reduxForm } from "redux-form";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const CommentForm = props => {
	let [value, setValue] = React.useState(false);
	console.log(value);

	return (
		<form className={styles.form}>
			<IconButton className={styles.button_icon}>
				<SentimentSatisfiedOutlinedIcon className={styles.icon} />
			</IconButton>
			<input onChange={e => setValue(e.target.value)} className={styles.input} placeholder='Add a comment...' />
			<Button className={styles.button_post} disabled={!value} variant='text'>
				Post
			</Button>
		</form>
	);
};

const CommentReduxForm = reduxForm({ form: "comment" })(CommentForm);

export default CommentReduxForm;
