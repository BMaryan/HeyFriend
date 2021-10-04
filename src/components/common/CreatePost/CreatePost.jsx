import React from "react";
import styles from "./CreatePost.module.css";

const CreatePost = props => {
	return (
		<div className={styles.create_post}>
			<div className={styles.wrapper_body}>
				<div className={styles.wrapper_input}>
					<input
						onChange={() => undefined}
						onClick={() => props.handleOpen()}
						className={styles.input}
						type='text'
						value=''
						placeholder="What's on your mind?"
					/>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
