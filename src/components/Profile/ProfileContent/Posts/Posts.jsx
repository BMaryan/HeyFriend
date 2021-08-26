import React from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";

const Posts = props => {
	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
};

export default Posts;
