import React from "react";
import styles from "./Post.module.css";

const Post = props => {
	return (
		<div className={styles.post}>
			<div className={styles.wrapper_post}>{props.post ? <img src={props.post.img} alt='' /> : <></>}</div>
		</div>
	);
};

export default Post;
