import React from "react";
import styles from "../Post.module.css";

const BodyPost = props => {
	return (
		<div className={styles.body}>
			{props.post && props.post.photo ? (
				<div className={styles.bodyPhoto} style={{ backgroundImage: `url(${props.post.photo})` }}></div>
			) : (
				<></>
			)}
		</div>
	);
};

export default BodyPost;
