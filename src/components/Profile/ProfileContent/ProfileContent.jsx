import React from "react";
// import Stories from "../../common/Stories/Stories";
import styles from "./ProfileContent.module.css";
import Posts from "./Posts/Posts";
import CreatePost from "../../common/CreatePost/CreatePost";

const ProfileContent = props => {
	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	return (
		<div className={styles.profile_content}>
			{/* side bar left */}
			<div className={styles.side_bar_left}>
				<div className={styles.aboutMe_container}>
					<div className={styles.title}>About me</div>
					{/* about me  */}
					<div className={styles.aboutMe}>
						{oftenCheckOtherProfile && otherProfile.profile.aboutMe ? (
							<div>{otherProfile.profile.aboutMe}</div>
						) : props.account && props.account.profile && props.account.profile.aboutMe ? (
							<div>{props.account.profile.aboutMe}</div>
						) : undefined}
					</div>
				</div>
			</div>

			{/* content */}
			<div className={styles.content}>
				<CreatePost account={props.account} otherProfile={otherProfile} accounts={props.accounts} setProfilePosts={props.setProfilePosts} />

				<Posts profile={props.profile} accounts={props.accounts} id={props.id} account={props.account} />
			</div>

			{/* side bar right */}
			<div className={styles.side_bar_right}></div>
		</div>
	);
};

export default ProfileContent;
