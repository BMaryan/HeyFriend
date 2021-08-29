import React from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";

const Posts = props => {
	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{props.profile && props.profile.posts && props.profile.posts.length > 0 ? (
					props.profile.posts.map(post => {
						return <Post key={post.id} post={post} profile={props.profile} />;
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Posts;
