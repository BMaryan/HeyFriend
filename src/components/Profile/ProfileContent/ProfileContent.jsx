import React from "react";
import styles from "./ProfileContent.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Information from "./Information/Information";
import Saved from "./Saved/Saved";
import { profileConstant } from "../../../core/constants/constants";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Posts from "./Posts/Posts";
import { useParams } from "react-router-dom";
import Media from "react-media";
import CreatePost from "../../common/CreatePost/CreatePost";
import { getUniqueGeneratedIdPost } from "../../../core/methods/methods";

const ProfileContent = (props) => {
  let params = useParams();
  let [postPhoto, setPostPhoto] = React.useState(null);
  let [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  let otherProfile = props.accounts.find((profile) => (profile && props.id ? profile.id === props.id : undefined));
  let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostPhoto(null);
  };

  return (
    <div className={styles.profile_content}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <NavLink exact to={props.id ? `${profileConstant}/${props.id}` : `${profileConstant}`} className={styles.item} activeClassName={styles.item_active}>
            <Media queries={{ small: "(max-width: 480px)" }}>
              {(matches) =>
                !matches.small ? (
                  <>
                    <BorderAllRoundedIcon className={styles.icon} />
                    Posts
                  </>
                ) : (
                  <>
                    <BorderAllRoundedIcon className={styles.icon} />
                  </>
                )
              }
            </Media>
          </NavLink>
          <NavLink to={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`} className={styles.item} activeClassName={styles.item_active}>
            <Media queries={{ small: "(max-width: 480px)" }}>
              {(matches) =>
                !matches.small ? (
                  <>
                    <InfoOutlinedIcon className={styles.icon} />
                    Information
                  </>
                ) : (
                  <>
                    <InfoOutlinedIcon className={styles.icon} />
                  </>
                )
              }
            </Media>
          </NavLink>
          {!props.id ? (
            <NavLink exact to={props.id ? `${profileConstant}/${props.id}/saved` : `${profileConstant}/saved`} className={styles.item} activeClassName={styles.item_active}>
              <Media queries={{ small: "(max-width: 480px)" }}>
                {(matches) =>
                  !matches.small ? (
                    <>
                      <BookmarkBorderIcon className={styles.icon} />
                      Saved
                    </>
                  ) : (
                    <>
                      <BookmarkBorderIcon className={styles.icon} />
                    </>
                  )
                }
              </Media>
            </NavLink>
          ) : undefined}
        </div>

        <Route
          exact
          path={props.id ? `${profileConstant}/${props.id}` : `${profileConstant}`}
          render={() => {
            return <Posts {...props} handleOpen={handleOpen} handleClose={handleClose} oftenCheckOtherProfile={oftenCheckOtherProfile} params={params} openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} />;
          }}
        />

        <Route path={props.id ? `${profileConstant}/${props.id}/information` : `${profileConstant}/information`} render={() => <Information accounts={props.accounts} id={props.id} account={props.account} otherProfile={otherProfile} oftenCheckOtherProfile={oftenCheckOtherProfile} />} />
        {!props.id ? <Route exact path={props.id ? `${profileConstant}/${props.id}/saved` : `${profileConstant}/saved`} render={() => <Saved openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} accounts={props.accounts} id={props.id} account={props.account} />} /> : undefined}
      </div>

      {/* toggle show create post container */}
      <CreatePost account={props.account} auth={props.auth} open={open} postPhoto={postPhoto} handleClose={handleClose} setProfilePosts={props.setProfilePosts} getUniqueGeneratedIdPost={getUniqueGeneratedIdPost} setPostPhoto={setPostPhoto} createPost={props.createPost} />
    </div>
  );
};

export default ProfileContent;
