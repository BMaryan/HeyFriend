import React from "react";
import styles from "../Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const HeadPost = props => {
	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	return (
		<div className={styles.head}>
			<div className={styles.wrapper_details}>
				<div className={styles.details_position}>
					<div className={styles.wrapper_profile_img}>
						{oftenCheckMyProfile && props.account.profile.avatar ? (
							<img src={props.account.profile.avatar} alt='' />
						) : oftenCheckOtherProfile && otherProfile.profile.avatar ? (
							<img src={otherProfile.profile.avatar} alt='' />
						) : (
							<img src={defaultAvatar} alt='' />
						)}
					</div>
					<div className={styles.details}>
						<div className={styles.fullName}>
							{oftenCheckMyProfile
								? props.account.profile.surname + " " + props.account.profile.name
								: oftenCheckOtherProfile
								? otherProfile.profile.surname + " " + otherProfile.profile.name
								: undefined}
						</div>
						<div className={styles.date}>24 June 2018 at 7:36 pm</div>
					</div>
				</div>

				<div>
					<FontAwesomeIcon className={styles.icon} icon={faEllipsisH} />
				</div>
			</div>

			{props.post && props.post.ownerCommentToPost ? (
				<div className={styles.commentOwnerOfPost}>{props.post.ownerCommentToPost}</div>
			) : undefined}
		</div>
	);
};

export default HeadPost;
