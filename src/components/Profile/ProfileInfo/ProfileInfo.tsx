import React from "react";
import { AccountType, ChatType, CreateChatType, FirebaseType, FollowersOfAccountType, FollowingOfAccountType, HistoryType, ParticipantsOfChatType, PostType } from "../../../types/types";
import { ChangeProfilePictureContainer, ContainerCoverProfile } from "../../../utils/helperForProfile/helperForProfile";
import { chatConstant, editConstant, profileConstant } from "../../../core/constants/constants";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import CustomAvatarBadge from "../../atoms/AvatarBadge/AvatarBadge";
import betaVershion from "../../../assets/images/betaVershion.png";
import styles from "./ProfileInfo.module.scss";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { fb } from "../../../firebase";
import moment from "moment";

interface ProfileInfoPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  chats: Array<FirebaseType<ChatType>>;
  id: string;
  history: HistoryType;
  updateAccountThunk: (account: AccountType) => void;
  createChatThunk: (data: CreateChatType) => any;
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
  const [openModalAvatarProfile, setOpenModalAvatarProfile] = React.useState(false);
  const [openModalCoverProfile, setOpenModalCoverProfile] = React.useState(false);

  const currentAccount: FirebaseType<AccountType> | undefined = props?.accounts.find((account: FirebaseType<AccountType>) => account?.data()?.id === props?.id);
  const numberOfPosts: Array<FirebaseType<PostType>> = props?.posts ? props?.posts?.filter((post: FirebaseType<PostType>) => (post?.data() ? post?.data().accountId === currentAccount?.data()?.id : [])) : [];
  const coverPhoto: string | undefined = currentAccount?.data()?.coverPhoto ? currentAccount?.data()?.coverPhoto : undefined;
  const isCheckFollowing = props?.account?.following ? props?.account?.following.find((following: FollowingOfAccountType) => (following?.id === props?.id ? following : undefined)) : undefined;

  const isChat: Array<FirebaseType<ChatType>> = props?.chats?.filter((chat: FirebaseType<ChatType>) => chat?.data()?.participants.length === 2 && chat?.data()?.participants?.find((participants: ParticipantsOfChatType) => currentAccount?.id === participants?.id && currentAccount?.id !== props?.account?.id));

  const isMyAccount = props?.account && props?.id === props?.account?.id;
  const isOtherAccount = props?.id !== props?.account?.id;

  const lastSignInDate = new Date(currentAccount?.data()?.metadata?.lastSignInTime as string);
  const isOnline = props?.account?.id !== props?.id ? Boolean(currentAccount?.data()?.isOnline) : undefined;

  // console.log(isChat);

  return (
    <div className={styles.profile_info}>
      <div className={styles.profile_cover} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverPhoto})` }}>
        <div className={styles.profile_cover_line}>
          {/* full name */}
          <div className={styles.profile_fullName}>{currentAccount ? currentAccount?.data()?.surname + " " + currentAccount?.data()?.name : undefined}</div>

          {/* status */}
          <div className={styles.profile_status}>{currentAccount ? <div>{currentAccount?.data()?.status}</div> : undefined}</div>

          {/* last sign in date */}
          <div className={styles.profile_status}>{props?.account?.id !== props?.id ? (!isOnline ? `In the network ${moment(lastSignInDate).fromNow()}` : "Now in the network") : undefined}</div>
        </div>

        {/* wrapper picture */}
        <div className={openModalAvatarProfile && isMyAccount ? styles.wrapper_profilePicture_active__center : styles.wrapper_profilePicture__center}>{isMyAccount ? props?.account && <CustomAvatarBadge color="success" avatarData={props?.account} overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" size="full" onClick={() => setOpenModalAvatarProfile(!openModalAvatarProfile)} /> : isOtherAccount ? currentAccount && <CustomAvatarBadge color="success" avatarData={currentAccount?.data()} overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" size="full" /> : undefined}</div>

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
        <div className={openModalAvatarProfile && isMyAccount ? styles.wrapper_profilePicture_active : styles.wrapper_profilePicture}>{isMyAccount ? props.account && <CustomAvatarBadge color="success" avatarData={props.account} overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" size="full" onClick={() => setOpenModalAvatarProfile(!openModalAvatarProfile)} /> : isOtherAccount ? currentAccount && <CustomAvatarBadge color="success" avatarData={currentAccount?.data()} overlap="circular" invisible={!isOnline} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" size="full" /> : undefined}</div>

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
                            dateCreated: fb.Timestamp.now(),
                            participants: [{ id: props.account?.id ? props.account?.id : "" }, { id: props?.id }],
                          })
                          .then((res: ParticipantsOfChatType) => props.history.push(`${chatConstant.path}/${res?.id}`))
                      : props.history.push(`${chatConstant.path}/${isChat[0]?.id}`);
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
                      props.account && props.updateAccountThunk({ ...props.account, following: props?.account?.following ? props?.account?.following.filter((following: FollowingOfAccountType) => following?.id !== props?.id) : [] });
                      currentAccount?.data() && props.updateAccountThunk({ ...currentAccount?.data(), followers: currentAccount?.data()?.followers ? currentAccount?.data()?.followers?.filter((followers: FollowersOfAccountType) => followers?.id !== props?.account?.id) : [] });
                    }}
                    variant="contained">
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={styles.button}
                    style={{ textTransform: "capitalize" }}
                    onClick={() => {
                      props.account && props.updateAccountThunk({ ...props.account, following: props?.account?.following ? [...props?.account?.following, { id: props?.id }] : [{ id: props?.id }] });
                      currentAccount?.data() && props.updateAccountThunk({ ...currentAccount?.data(), followers: currentAccount?.data()?.followers ? [...(currentAccount?.data()?.followers as Array<any>), { id: props.account?.id }] : [{ id: props.account?.id }] });
                    }}
                    variant="contained">
                    Follow
                  </Button>
                )}
              </>
            ) : (
              <NavLink className={styles.navLink_message} to={`${editConstant.path}${profileConstant.path}`}>
                <Button className={styles.button} variant="contained">
                  {/* <FontAwesomeIcon className={styles.icon} icon={faPencilAlt} /> */}
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
