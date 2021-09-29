import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, CreateNewPostContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCamera } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

const ProfileInfo = props => {
	let [toggleCoverContainer, setToggleCoverContainer] = React.useState(false);
	let [changeProfilePicture, setChangeProfilePicture] = React.useState(false);
	let [createNewPost, setCreateNewPost] = React.useState(false);

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;
	let coverPhoto =
		oftenCheckMyProfile && props.account.profile.coverPhoto
			? props.account.profile.coverPhoto
			: oftenCheckOtherProfile && otherProfile.profile.coverPhoto
			? otherProfile.profile.coverPhoto
			: undefined;

	return (
		<div className={styles.profile_info}>
			<div
				className={styles.profile_cover}
				style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}>
				<div className={styles.profile_cover_line}>
					{/* full name */}
					<div className={styles.profile_fullName}>
						{oftenCheckOtherProfile ? (
							otherProfile.profile.surname + " " + otherProfile.profile.name
						) : oftenCheckMyProfile ? (
							props.account.profile.surname + " " + props.account.profile.name
						) : (
							<></>
						)}
					</div>

					{/* status */}
					<div className={styles.profile_status}>
						{oftenCheckOtherProfile && otherProfile.profile.status ? (
							<div>{otherProfile.profile.status}</div>
						) : oftenCheckMyProfile && props.account.profile.status ? (
							<div>{props.account.profile.status}</div>
						) : undefined}
					</div>
				</div>

				{/* change cover img */}
				{!props.id ? (
					<div className={styles.wrapper_change_cover}>
						<FontAwesomeIcon
							onClick={() => (toggleCoverContainer ? setToggleCoverContainer(false) : setToggleCoverContainer(true))}
							className={styles.icon_change_cover}
							icon={faCamera}
						/>
					</div>
				) : undefined}
			</div>

			{/* 				profile info line				 */}
			<div className={styles.profile_info_line}>
				{/* wrapper picture */}
				<div className={changeProfilePicture && !props.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>
					{oftenCheckMyProfile && props.account.profile.avatar ? (
						<img
							onClick={() => (changeProfilePicture ? setChangeProfilePicture(false) : setChangeProfilePicture(true))}
							src={props.account.profile.avatar}
							title='Change profile photo'
							alt=''
						/>
					) : oftenCheckOtherProfile && otherProfile.profile.avatar ? (
						<img src={otherProfile.profile.avatar} alt='' />
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
								{oftenCheckOtherProfile && otherProfile.profile.posts && otherProfile.profile.posts.length > 0
									? otherProfile.profile.posts.length
									: 0 || (oftenCheckMyProfile && props.account.profile.posts && props.account.profile.posts.length > 0)
									? props.account.profile.posts.length
									: 0}
							</div>
							<div className={styles.detail_title}>Posts</div>
						</div>
						<div className={styles.details_info}>
							<div className={styles.detail_number}>
								{oftenCheckOtherProfile && otherProfile.profile.followers && otherProfile.profile.followers.length > 0
									? otherProfile.profile.followers.length
									: 0 || (oftenCheckMyProfile && props.account.profile.followers && props.account.profile.followers.length > 0)
									? props.account.profile.followers.length
									: 0}
							</div>
							<div className={styles.detail_title}>Followers</div>
						</div>
						<div className={styles.details_info}>
							<div className={styles.detail_number}>
								{oftenCheckOtherProfile && otherProfile.profile.following && otherProfile.profile.following.length > 0
									? otherProfile.profile.following.length
									: 0 || (oftenCheckMyProfile && props.account.profile.following && props.account.profile.following.length > 0)
									? props.account.profile.following.length
									: 0}
							</div>
							<div className={styles.detail_title}>Following</div>
						</div>
					</div>

					<div className={styles.wrapper_button}>
						{props.id ? (
							<>
								<NavLink className={styles.navLink_message} to={"/chat/" + props.id}>
									<Button onClick={() => props.addChat(props.id)} variant='contained'>
										Message
									</Button>
								</NavLink>
								<Button onClick={() => props.follow(props.id)} variant='contained'>
									Follow
								</Button>
							</>
						) : (
							<NavLink className={styles.navLink_message} to='/account/edit/profile'>
								<Button variant='contained'>
									<FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
									Edit profile
								</Button>
							</NavLink>
						)}
					</div>
				</div>
			</div>

			{/* toggle show container for change something in profile */}
			{/* toggle cover container */}
			{!props.id && props.account.id !== props.id ? (
				<div>
					{toggleCoverContainer ? (
						<ContainerCoverProfile
							profile={props.profile}
							accounts={props.accounts}
							getProfileData={props.getProfileData}
							account={props.account}
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
			{!props.id && props.account.id !== props.id ? (
				<div>
					{changeProfilePicture ? (
						<ChangeProfilePictureContainer
							profile={props.profile}
							accounts={props.accounts}
							getProfileData={props.getProfileData}
							account={props.account}
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
			{!props.id && props.account.id !== props.id ? (
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
