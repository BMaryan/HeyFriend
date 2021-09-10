import React from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";

const Posts = props => {
	let found = props.profiles.find(profile => (profile ? profile.id === props.profileAuthorizationData.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{/* {props.profile && props.profile.posts && props.profile.posts.length > 0 ? (
					props.profile.posts.map(post => {
						return <Post key={post.id} post={post} profile={props.profile} />;
					})
				) : (
					<></>
				)} */}
				{/* {props.profiles && props.profile.posts ? (
					props.profiles.map(profile => {
						return (
							profile.profile &&
							profile.profile.posts &&
							profile.profile.posts.map(post => <Post key={post.id} post={post} profile={props.profile} />)
						);
					})
				) : (
					<></>
				)} */}

				{found && found.profile && found.profile.posts ? (
					found.profile.posts.map(post => <Post key={post.id} post={post} profile={props.profile} />)
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Posts;
