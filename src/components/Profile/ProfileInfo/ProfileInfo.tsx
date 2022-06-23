import React from "react";
import { AccountType, ChatType, FollowersOfAccountType, FollowingOfAccountType, ParticipantsOfChatType, PostType } from "../../../types/types";
import { ChangeProfilePictureContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { chatConstant, editConstant, profileConstant } from "../../../core/constants/constants";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import betaVershion from "../../../assets/images/betaVershion.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfileInfo.module.scss";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

interface ProfileInfoPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  posts: Array<PostType>;
  chats: Array<ChatType>;
  id: string;
  // fix
  updateAccountThunk: any;
  createChatThunk: any;
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [openModalCoverProfile, setOpenModalCoverProfile] = React.useState(false);
  const history = useHistory();

  let currentAccount = props?.accounts.find((account: AccountType) => account.data().id === props?.id);
  let isMyAccount = props?.account && props?.id === props?.account?.id;
  let isOtherAccount = props?.id !== props?.account?.id;
  let coverPhoto = currentAccount?.data()?.coverPhoto ? currentAccount?.data()?.coverPhoto : undefined;
  let numberOfPosts = props?.posts ? props?.posts?.filter((post: PostType) => (post?.data() ? post?.data().accountId === currentAccount?.data()?.id : [])) : [];
  let isCheckFollowing = props?.account?.following ? props?.account?.following.find((following: FollowingOfAccountType) => (following?.id === props?.id ? following : undefined)) : undefined;
  let isChat = props?.chats?.length > 0 ? props?.chats?.filter((chat: ChatType) => (chat.data().participants?.length > 0 ? chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => currentAccount?.id === participants?.id && currentAccount?.id !== props?.account?.id) : undefined)) : undefined;

  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}>
        <div className={styles.profile_cover_line}>
          {/* full name */}
          <div className={styles.profile_fullName}>{currentAccount ? currentAccount?.data()?.surname + " " + currentAccount?.data()?.name : undefined}</div>

          {/* status */}
          <div className={styles.profile_status}>{currentAccount ? <div>{currentAccount?.data()?.status}</div> : undefined}</div>
        </div>

        {/* wrapper picture */}
        <div className={openModalAvatarProfile && isMyAccount ? styles.wrapper_profilePicture_active__center : styles.wrapper_profilePicture__center}>{isMyAccount ? <img src={props?.account?.avatar || defaultAvatar} onClick={() => setOpenModalAvatarProfile(!openModalAvatarProfile)} title="Change profile photo" alt="" /> : isOtherAccount ? <img src={currentAccount?.data()?.avatar || defaultAvatar} alt="" /> : undefined}</div>

        {/* change cover img */}
        {isMyAccount && (
          <div className={styles.wrapper_change_cover}>
            <PhotoCameraOutlinedIcon onClick={() => setOpenModalCoverProfile(!openModalCoverProfile)} className={styles.icon_change_cover} fontSize="medium" />
          </div>
        )}
      </div>

      {/* 				profile info line				 */}
      <div className={styles.profile_info_line}>
        {/* wrapper picture */}
        <div className={openModalAvatarProfile && isMyAccount ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>{isMyAccount ? <img src={props?.account?.avatar || defaultAvatar} onClick={() => setOpenModalAvatarProfile(!openModalAvatarProfile)} title="Change profile photo" alt="" /> : isOtherAccount ? <img src={currentAccount?.data()?.avatar || defaultAvatar} alt="" /> : undefined}</div>

        {/* wrapper profile details info line */}
        <div className={styles.wrapper_profile_details_info_line}>
          {/* full name */}
          <div className={styles.profile_fullName__media}>{currentAccount?.data() ? currentAccount?.data()?.surname + " " + currentAccount?.data()?.name : undefined}</div>

          {/* status */}
          <div className={styles.profile_status__media}>{currentAccount?.data() ? <div>{currentAccount?.data()?.status}</div> : undefined}</div>

          <div className={styles.details_info_content}>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>{numberOfPosts?.length}</div>
              <div className={styles.detail_title}>Posts</div>
            </div>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>{currentAccount?.data()?.followers?.length ? currentAccount?.data()?.followers?.length : 0}</div>
              <div className={styles.detail_title}>Followers</div>
            </div>
            <div className={styles.details_info}>
              <div className={styles.detail_number}>{currentAccount?.data()?.following?.length ? currentAccount?.data()?.following?.length : 0}</div>
              <div className={styles.detail_title}>Following</div>
            </div>
            {/* {isMyAccount && (
              <div className={styles.details_info}>
                <div className={styles.detail_number}>{currentAccount?.data()?.savedPosts?.length ? currentAccount?.data()?.savedPosts?.length : 0}</div>
                <div className={styles.detail_title}>Saved</div>
              </div>
            )} */}
          </div>

          <div className={styles.wrapper_button}>
            {!isMyAccount ? (
              <>
                <Button
                  className={styles.button}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => {
                    !isChat || isChat.length < 1
                      ? props
                          .createChatThunk({
                            participants: [{ id: props?.account?.id }, { id: props?.id }],
                          })
                          .then((res: ParticipantsOfChatType) => history.push(`${chatConstant.path}/${res?.id}`))
                      : history.push(`${chatConstant.path}/${isChat[0]?.id}`);
                  }}
                  variant="contained">
                  Message
                  <img className={styles.beta_vershion_picture} src={betaVershion} alt="" />
                </Button>

                {isCheckFollowing ? (
                  <Button
                    className={styles.button}
                    style={{ textTransform: "capitalize" }}
                    onClick={() => {
                      props.updateAccountThunk({ ...props.account, following: props?.account?.following ? props?.account?.following.filter((following: FollowingOfAccountType) => following?.id !== props?.id) : [] });
                      props.updateAccountThunk({ ...currentAccount?.data(), followers: currentAccount?.data()?.followers ? currentAccount?.data()?.followers.filter((followers: FollowersOfAccountType) => followers?.id !== props?.account?.id) : [] });
                    }}
                    variant="contained">
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={styles.button}
                    style={{ textTransform: "capitalize" }}
                    onClick={() => {
                      props.updateAccountThunk({ ...props.account, following: props?.account?.following ? [...props?.account?.following, { id: props?.id }] : [{ id: props?.id }] });
                      props.updateAccountThunk({ ...currentAccount?.data(), followers: currentAccount?.data()?.followers ? [...currentAccount?.data()?.followers, { id: props?.account?.id }] : [{ id: props?.account?.id }] });
                    }}
                    variant="contained">
                    Follow
                  </Button>
                )}
              </>
            ) : (
              <NavLink className={styles.navLink_message} to={`${editConstant.path}${profileConstant.path}`}>
                <Button className={styles.button} variant="contained">
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
      {isMyAccount ? <div>{openModalCoverProfile ? <ContainerCoverProfile account={props.account} openModalCoverProfile={openModalCoverProfile} setOpenModalCoverProfile={setOpenModalCoverProfile} updateAccountThunk={props.updateAccountThunk} /> : <></>}</div> : <></>}

      {/* change picture */}
      {isMyAccount ? <div>{openModalAvatarProfile ? <ChangeProfilePictureContainer account={props.account} openModalAvatarProfile={openModalAvatarProfile} setOpenModalAvatarProfile={setOpenModalAvatarProfile} updateAccountThunk={props.updateAccountThunk} /> : <></>}</div> : <></>}
    </div>
  );
};

export default ProfileInfo;
