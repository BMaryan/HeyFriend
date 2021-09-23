import React from "react";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faHeart, faComment, faPaperPlane, faBookmark } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";

const Post = props => {
	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let otherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = myProfile && myProfile.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	console.log(props);

	return (
		<div className={styles.wrapper_post}>
			<div className={styles.post}>
				<div className={styles.head}>
					<div className={styles.wrapper_details}>
						<div className={styles.details_position}>
							<div className={styles.wrapper_profile_img}>
								{oftenCheckMyProfile && myProfile.profile.img ? (
									<img src={myProfile.profile.img} alt='' />
								) : oftenCheckOtherProfile && otherProfile.profile.img ? (
									<img src={otherProfile.profile.img} alt='' />
								) : (
									<img src={defaultAvatar} alt='' />
								)}
							</div>
							<div className={styles.details}>
								<div className={styles.fullName}>
									{oftenCheckMyProfile
										? myProfile.profile.surname + " " + myProfile.profile.name
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
				<div className={styles.body}>{props.post && props.post.img ? <img src={props.post.img} alt='' /> : <></>}</div>
				<div className={styles.footer}>
					<div className={styles.features}>
						<div className={styles.features_left}>
							<FontAwesomeIcon className={styles.icon} icon={faHeart} />
							<FontAwesomeIcon className={styles.icon} icon={faComment} />
							<FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
						</div>
						<div className={styles.features_right}>
							<FontAwesomeIcon className={styles.icon} icon={faBookmark} />
						</div>
					</div>
					<div className={styles.numberOfComments}>
						{props.post && props.post.likes ? props.post.likes : 0} <span>likes</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
