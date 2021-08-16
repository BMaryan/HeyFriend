import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePost.module.css";

const CreatePost = post => {
	return (
		<div className={styles.create_post}>
			<div className={styles.wrapper_title}>
				<div>
					<FontAwesomeIcon className={styles.icon} icon={faPlusSquare} />
				</div>
				<div>Create post</div>
			</div>
			<div className={styles.wrapper_input}>
				<input type='text' />
			</div>
			<div></div>
		</div>
	);
};

export default CreatePost;
