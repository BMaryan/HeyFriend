import React from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";

const Posts = props => {
	let myProfile = props.profiles.find(profile => (profile ? profile.id === props.profileAuthorizationData.id : undefined));
	let otherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{myProfile && myProfile.profile && myProfile.profile.posts && !otherProfile ? (
					myProfile.profile.posts.map(post => <Post key={post.id} post={post} profile={props.profile} />)
				) : otherProfile && otherProfile.profile && otherProfile.profile.posts ? (
					otherProfile.profile.posts.map(post => <Post key={post.id} post={post} profile={props.profile} />)
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Posts;
