import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileInfo = props => {
	let [toggleCoverContainer, setToggleCoverContainer] = React.useState(false);
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);
	let [createNewPost, setCreateNewPost] = React.useState(false);

	let myProfile = props.profiles.find(profile =>
		profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	);
	let otherProfile = props.profiles.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let coverPhoto = myProfile && myProfile.profile && myProfile.profile.coverPhoto ? myProfile.profile.coverPhoto : undefined;

	return (
		<div className={styles.profile_info}>
			<div
				className={styles.profile_cover}
				style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}>
				<div className={styles.profile_cover_line}>
					{/* full name */}
					<div className={styles.profile_fullName}>
						{otherProfile && otherProfile.profile ? (
							otherProfile.profile.surname + " " + otherProfile.profile.name
						) : myProfile && myProfile.profile ? (
							myProfile.profile.surname + " " + myProfile.profile.name
						) : (
							<></>
						)}
					</div>

					{/* status */}
					<div className={styles.profile_status}>
						{otherProfile && otherProfile.profile && otherProfile.profile.status ? (
							<div>{otherProfile.profile.status}</div>
						) : myProfile && myProfile.profile && myProfile.profile.status ? (
							<div>{myProfile.profile.status}</div>
						) : undefined}
					</div>
				</div>

				{/* change cover img */}
				<div className={styles.wrapper_change_cover}>
					<FontAwesomeIcon
						onClick={() => (toggleCoverContainer ? setToggleCoverContainer(false) : setToggleCoverContainer(true))}
						className={styles.icon_change_cover}
						icon={faCamera}
					/>
				</div>
			</div>

			{/* 				profile info line				 */}
			<div className={styles.profile_info_line}>
				{/* wrapper picture */}
				<div className={changeProfilePicture && !props.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					{myProfile && myProfile.profile && myProfile.profile.img && !props.id ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={myProfile.profile.img}
							title='Change profile photo'
							alt=''
						/>
					) : otherProfile && otherProfile.profile && otherProfile.profile.img && props.id ? (
						<img src={otherProfile.profile.img} alt='' />
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
								{otherProfile && otherProfile.profile && otherProfile.profile.posts.length > 0
									? otherProfile.profile.posts.length
									: 0 || (myProfile && myProfile.profile && myProfile.profile.posts.length > 0 && !props.id)
									? myProfile.profile.posts.length
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
								<NavLink className={styles.navLink_message} to={"/chat/" + props.id}>
									<button onClick={() => props.addChat(props.id)}>Message</button>
								</NavLink>
								<button type='submit'>Follow</button>
							</>
						) : (
							<NavLink className={styles.navLink_message} to='/edit/profile'>
								<button type='submit'>
									<FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
									Edit profile
								</button>
							</NavLink>
						)}
					</div>
				</div>
			</div>

			{/* toggle show container for change something in profile */}
			{/* toggle cover container */}
			{!props.id && props.profileAuthorizationData.id !== props.id ? (
				<div>
					{toggleCoverContainer ? (
						<ContainerCoverProfile
							profile={props.profile}
							profiles={props.profiles}
							getProfileData={props.getProfileData}
							profileAuthorizationData={props.profileAuthorizationData}
							setToggleCoverContainer={setToggleCoverContainer}
						/>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}

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
