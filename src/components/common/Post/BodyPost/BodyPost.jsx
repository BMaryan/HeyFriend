import React from "react";
import styles from "../Post.module.css";

const BodyPost = props => {
	return (
		<div className={styles.body}>
			{props.post && props.post.avatar ? (
				<div className={styles.bodyPhoto} style={{ backgroundImage: `url(${props.post.avatar})` }}></div>
			) : (
				// style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.post.avatar})` }}></div>
				<></>
			)}
		</div>
	);
};

export default BodyPost;
