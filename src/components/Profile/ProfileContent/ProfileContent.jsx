import React from "react";
// import Stories from "../../common/Stories/Stories";
import styles from "./ProfileContent.module.css";
import Posts from "./Posts/Posts";
import CreatePost from "../../common/CreatePost/CreatePost";

const ProfileContent = props => {
	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let otherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.profile_content}>
			{/* side bar left */}
			<div className={styles.side_bar_left}>
				<div className={styles.aboutMe_container}>
					{/* about me  */}
					<div className={styles.aboutMe}>
						{otherProfile && otherProfile.profile && otherProfile.profile.aboutMe ? (
							<div>{otherProfile.profile.aboutMe}</div>
						) : myProfile && myProfile.profile && myProfile.profile.aboutMe ? (
							<div>{myProfile.profile.aboutMe}</div>
						) : (
							<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit totam beatae vel repellat voluptate</div>
						)}
					</div>
				</div>
			</div>

			{/* content */}
			<div className={styles.content}>
				<div className={styles.posts}>
					<CreatePost profiles={props.profiles} setProfilePosts={props.setProfilePosts} />
					{/* <div className={styles.posts_title}>Photo feed</div> */}
					<Posts
						profile={props.profile}
						profiles={props.profiles}
						id={props.id}
						profileAuthorizationData={props.profileAuthorizationData}
					/>
				</div>
			</div>

			{/* side bar right */}
			{/* <div className={styles.side_bar_right}>Side bar right</div> */}
		</div>
	);
};

export default ProfileContent;
