import React from "react";
import Stories from "../../common/Stories/Stories";
import styles from "./ProfileContent.module.css";
import Posts from "./Posts/Posts";

const ProfileContent = props => {
	return (
		<div className={styles.profile_content}>
			<div className={styles.stories}>
				<div className={styles.stories_title}>Actual stories</div>

				<div className={styles.stories_content}>
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
					<Stories profile={props.profile} />
				</div>
			</div>
			<div className={styles.posts}>
				<div className={styles.posts_title}>Photo feed</div>
				<Posts profile={props.profile} />
			</div>
		</div>
	);
};

export default ProfileContent;
