import React from "react";
import styles from "./Posts.module.css";
import Post from "../../../common/Post/Post";

const Posts = props => {
	let myProfile = props.profiles.find(profile => (profile ? profile.id === props.profileAuthorizationData.id : undefined));
	let otherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{myProfile && myProfile.profile && myProfile.profile.posts && !otherProfile ? (
					myProfile.profile.posts.map(post => (
						<Post
							key={post.id}
							post={post}
							profiles={props.profiles}
							profileAuthorizationData={props.profileAuthorizationData}
							id={props.id}
						/>
					))
				) : otherProfile && otherProfile.profile && otherProfile.profile.posts ? (
					otherProfile.profile.posts.map(post => (
						<Post
							key={post.id}
							post={post}
							profiles={props.profiles}
							profileAuthorizationData={props.profileAuthorizationData}
							id={props.id}
						/>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Posts;
