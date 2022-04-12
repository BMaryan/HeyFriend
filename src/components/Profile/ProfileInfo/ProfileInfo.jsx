import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import { ChangeProfilePictureContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { editConstant, profileConstant } from "../../../core/constants/constants";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import betaVershion from "../../../assets/images/betaVershion.png";

const ProfileInfo = (props) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [openModalCoverProfile, setOpenModalCoverProfile] = React.useState(false);

  // let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
  // let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
  // let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;
  // let coverPhoto =
  // 	oftenCheckMyProfile && props.account.profile.coverPhoto
  // 		? props.account.profile.coverPhoto
  // 		: oftenCheckOtherProfile && otherProfile.profile.coverPhoto
  // 		? otherProfile.profile.coverPhoto
  // 		: undefined;
  // let checkFollow =
  // 	props.account && props.account.profile && props.account.profile.following
  // 		? props.account.profile.following.find(account => account.id === props.id)
  // 		: undefined;

  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${defaultAvatar})` }}>
        {/* <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}> */}
        <div className={styles.profile_cover_line}>
          {/* full name */}
          {props.account ? (
            <div className={styles.profile_fullName}>
              {/* {oftenCheckOtherProfile ? (
							otherProfile.profile.surname + " " + otherProfile.profile.name
						) : oftenCheckMyProfile ? (
							props.account.profile.surname + " " + props.account.profile.name
						) : (
							<></>
						)} */}
              {props.account.surname + " " + props.account.name}
            </div>
          ) : null}

          {/* status */}
          <div className={styles.profile_status}>
            test
            {/* {oftenCheckOtherProfile && otherProfile.profile.status ? (
							<div>{otherProfile.profile.status}</div>
						) : oftenCheckMyProfile && props.account.profile.status ? (
							<div>{props.account.profile.status}</div>
						) : undefined} */}
          </div>
        </div>

        {/* wrapper picture */}
        {/* <div
					className={
						openModalAvatarProfile && !props.id ? styles.wrapper_profilePicture_active__center : styles.wrapper_profilePicture__center
					}>
					{oftenCheckMyProfile && props.account.profile.avatar ? (
						<img
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							src={props.account.profile.avatar}
							title='Change profile photo'
							alt=''
						/>
					) : oftenCheckOtherProfile && otherProfile.profile.avatar ? (
						<img src={otherProfile.profile.avatar} alt='' />
					) : !props.id ? (
						<img
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							src={defaultAvatar}
							title='Change profile photo'
							alt=''
						/>
					) : (
						<img src={defaultAvatar} alt='' />
					)}
				</div> */}

        {/* change cover img */}
        {/* {!props.id ? ( */}
        <div className={styles.wrapper_change_cover}>
          <PhotoCameraOutlinedIcon
            // onClick={() => (openModalCoverProfile ? setOpenModalCoverProfile(false) : setOpenModalCoverProfile(true))}
            className={styles.icon_change_cover}
            fontSize="medium"
          />
        </div>
        {/* // ) : undefined} */}
      </div>

      {/* 				profile info line				 */}
      <div className={styles.profile_info_line}>
        {/* wrapper picture */}
        <div className={styles.wrapper_profilePicture}>
          {/* <div className={openModalAvatarProfile && !props.id ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}> */}
          test
          {/* {oftenCheckMyProfile && props.account.profile.avatar ? (
						<img
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							src={props.account.profile.avatar}
							title='Change profile photo'
							alt=''
						/>
					) : oftenCheckOtherProfile && otherProfile.profile.avatar ? (
						<img src={otherProfile.profile.avatar} alt='' />
					) : !props.id ? (
						<img
							onClick={() => (openModalAvatarProfile ? setOpenModalAvatarProfile(false) : setOpenModalAvatarProfile(true))}
							src={defaultAvatar}
							title='Change profile photo'
							alt=''
						/>
					) : (
						<img src={defaultAvatar} alt='' />
					)} */}
        </div>

        {/* wrapper profile details info line */}
        <div className={styles.wrapper_profile_details_info_line}>
          {/* full name */}
          <div className={styles.profile_fullName__media}>
            test
            {/* {oftenCheckOtherProfile ? (
							otherProfile.profile.surname + " " + otherProfile.profile.name
						) : oftenCheckMyProfile ? (
							props.account.profile.surname + " " + props.account.profile.name
						) : (
							<></>
						)} */}
          </div>

          {/* status */}
          <div className={styles.profile_status__media}>
            test
            {/* {oftenCheckOtherProfile && otherProfile.profile.status ? (
							<div>{otherProfile.profile.status}</div>
						) : oftenCheckMyProfile && props.account.profile.status ? (
							<div>{props.account.profile.status}</div>
						) : undefined} */}
          </div>

          <div className={styles.details_info_content}>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>
                test
                {/* {oftenCheckOtherProfile && otherProfile.profile.posts && otherProfile.profile.posts.length > 0
									? otherProfile.profile.posts.length
									: 0 || (oftenCheckMyProfile && props.account.profile.posts && props.account.profile.posts.length > 0)
									? props.account.profile.posts.length
									: 0} */}
              </div>
              <div className={styles.detail_title}>Posts</div>
            </div>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>
                test
                {/* {oftenCheckOtherProfile && otherProfile.profile.followers && otherProfile.profile.followers.length > 0
									? otherProfile.profile.followers.length
									: 0 || (oftenCheckMyProfile && props.account.profile.followers && props.account.profile.followers.length > 0)
									? props.account.profile.followers.length
									: 0} */}
              </div>
              <div className={styles.detail_title}>Followers</div>
            </div>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>
                test
                {/* {oftenCheckOtherProfile && otherProfile.profile.following && otherProfile.profile.following.length > 0
									? otherProfile.profile.following.length
									: 0 || (oftenCheckMyProfile && props.account.profile.following && props.account.profile.following.length > 0)
									? props.account.profile.following.length
									: 0} */}
              </div>
              <div className={styles.detail_title}>Following</div>
            </div>
          </div>

          <div className={styles.wrapper_button}>
            {/* {props.id ? (
              <>
                <Button className={styles.button} style={{ textTransform: "capitalize" }} variant="contained">
                  Message
                  <img className={styles.beta_vershion_picture} src={betaVershion} alt="" />
                </Button> */}
            test
            {/* {checkFollow ? (
									<Button style={{ textTransform: "capitalize" }} onClick={() => props.unFollowing(props.id)} variant='contained'>
										Unfollow
									</Button>
								) : (
									<Button
										style={{ textTransform: "capitalize" }}
										onClick={() => {
											props.following(props.id);
										}}
										variant='contained'>
										Follow
									</Button>
								)} */}
            {/* </>
            ) : (
              <NavLink className={styles.navLink_message} to={`${editConstant}${profileConstant}`}>
                <Button variant="contained">
                  <FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
                  Edit profile
                </Button>
              </NavLink>
            )} */}
          </div>
        </div>
      </div>

      {/* toggle show container for change something in profile */}
      {/* toggle cover container */}
      {/* {!props.id && props.account.id !== props.id ? <div>{openModalCoverProfile ? <ContainerCoverProfile profile={props.profile} accounts={props.accounts} getProfileData={props.getProfileData} account={props.account} openModalCoverProfile={openModalCoverProfile} setOpenModalCoverProfile={setOpenModalCoverProfile} /> : <></>}</div> : <></>} */}

      {/* change picture */}
      {/* {!props.id && props.account.id !== props.id ? <div>{openModalAvatarProfile ? <ChangeProfilePictureContainer profile={props.profile} accounts={props.accounts} getProfileData={props.getProfileData} account={props.account} openModalAvatarProfile={openModalAvatarProfile} setOpenModalAvatarProfile={setOpenModalAvatarProfile} /> : <></>}</div> : <></>} */}
    </div>
  );
};

export default ProfileInfo;
