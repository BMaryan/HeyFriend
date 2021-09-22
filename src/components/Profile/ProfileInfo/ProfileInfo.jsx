import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileInfo = props => {
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);
	let [createNewPost, setCreateNewPost] = React.useState(false);

	let foundMyProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let foundOtherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.profile_info}>
			<div className={styles.profile_cover}>
				<div className={styles.profile_cover_line}>
					{/* full name */}
					<div className={styles.profile_fullName}>
						{foundOtherProfile && foundOtherProfile.profile ? (
							foundOtherProfile.profile.surname + " " + foundOtherProfile.profile.name
						) : foundMyProfile && foundMyProfile.profile ? (
							foundMyProfile.profile.surname + " " + foundMyProfile.profile.name
						) : (
							<></>
						)}
					</div>

					{/* status */}
					<div className={styles.profile_status}>
						{foundOtherProfile && foundOtherProfile.profile && foundOtherProfile.profile.status ? (
							<div>{foundOtherProfile.profile.status}</div>
						) : foundMyProfile && foundMyProfile.profile && foundMyProfile.profile.status ? (
							<div>{foundMyProfile.profile.status}</div>
						) : (
							<div>I'm good today, but I wasn't good yesterday!</div>
						)}
					</div>
				</div>
			</div>

			{/* 				profile info line				 */}
			<div className={styles.profile_info_line}>
				{/* wrapper picture */}
				<div className={changeProfilePicture && !props.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					{foundMyProfile && foundMyProfile.profile && foundMyProfile.profile.img && !props.id ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={foundMyProfile.profile.img}
							title='Change profile photo'
							alt=''
						/>
					) : foundOtherProfile && foundOtherProfile.profile && foundOtherProfile.profile.img && props.id ? (
						<img src={foundOtherProfile.profile.img} alt='' />
					) : !props.id ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={defaultAvatar}
							title='Change profile photo'
							alt=''
						/>
					) : (
						<img src={defaultAvatar} alt='' />
					)}
				</div>

				{/* wrapper profile details info line */}
				<div className={styles.wrapper_profile_details_info_line}>
					<div className={styles.details_info_content}>
						<div className={styles.details_info}>
							<div className={styles.detail_number}>
								{foundOtherProfile && foundOtherProfile.profile && foundOtherProfile.profile.posts.length > 0
									? foundOtherProfile.profile.posts.length
									: 0 || (foundMyProfile && foundMyProfile.profile && foundMyProfile.profile.posts.length > 0 && !props.id)
									? foundMyProfile.profile.posts.length
									: 0}
							</div>
							<div className={styles.detail_title}>Posts</div>
						</div>
						<div className={styles.details_info}>
							<div className={styles.detail_number}>261k</div>
							<div className={styles.detail_title}>Followers</div>
						</div>
						<div className={styles.details_info}>
							<div className={styles.detail_number}>674</div>
							<div className={styles.detail_title}>Following</div>
						</div>
					</div>

					<div className={styles.wrapper_button}>
						{props.id ? (
							<>
								<button onClick={() => props.addChat(props.id)}>
									<NavLink className={styles.navLink_message} to={"/chat/" + props.id}>
										Message
									</NavLink>
								</button>
								<button type='submit'>Follow</button>
							</>
						) : (
							<button type='submit'>
								<FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
								Edit profile
							</button>
						)}
					</div>
				</div>
			</div>

			{/* toggle show container for change something in profile */}
			{/* change picture */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div>
					{changeProfilePicture ? (
						<ChangeProfilePictureContainer
							profile={props.profile}
							profiles={props.profiles}
							getProfileData={props.getProfileData}
							profileAuthorizationData={props.profileAuthorizationData}
							setChangeProfilePicture={setChangeProfilePicture}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}

			{/* create post */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div>
					{createNewPost ? (
						<CreateNewPostContainer
							setProfilePosts={props.setProfilePosts}
							getProfileData={props.getProfileData}
							profile={props.profile}
							setCreateNewPost={setCreateNewPost}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ProfileInfo;

// {
// 	/* </div> */
// }
// {
// 	/* button message not for my profile */
// }
// {
// 	/* {props.id && props.profileAuthorizationData.id !== props.id ? (
// 				<div className={styles.wrapper_button_message}>
// 					<button className={styles.button_message} onClick={() => props.addChat(props.id)}>
// 						<NavLink className={styles.navLink_message} to={"/chat/" + props.id}>
// 							Message
// 						</NavLink>
// 					</button>
// 				</div>
// 			) : (
// 				<></>
// 			)} */
// }

// {
// 	/* button create post */
// }
// {
// 	/* {!props.id && props.profileAuthorizationData.id !== props.id ? (
// 				<div className={styles.wrapper_button_createPost}>
// 					<button className={styles.button_createPost} onClick={() => (createNewPost ? setCreateNewPost(false) : setCreateNewPost(true))}>
// 						Create post
// 					</button>
// 				</div>
// 			) : (
// 				<></>
// 			)} */
// }
