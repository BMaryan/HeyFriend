import React from "react";
import styles from "./Posts.module.css";
import Post from "../../../common/Post/Post";

const Posts = props => {
	let myProfile = props.accounts.find(profile => (profile ? profile.id === props.account.id : undefined));
	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{myProfile && myProfile.profile && myProfile.profile.posts && !otherProfile ? (
					myProfile.profile.posts.map(post => (
						<Post key={post.id} post={post} accounts={props.accounts} account={props.account} id={props.id} />
					))
				) : otherProfile && otherProfile.profile && otherProfile.profile.posts ? (
					otherProfile.profile.posts.map(post => (
						<Post key={post.id} post={post} accounts={props.accounts} account={props.account} id={props.id} />
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Posts;
