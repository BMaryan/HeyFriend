import React from "react";
import { getUniqueGeneratedIdPost } from "../../../core/methods/methods";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import { profileConstant } from "../../../core/constants/constants";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CreatePost from "../../common/CreatePost/CreatePost";
import Information from "./Information/Information";
import { AccountType, PostType } from "../../../types/types";
import styles from "./ProfileContent.module.scss";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Saved from "./Saved/Saved";
import Posts from "./Posts/Posts";
import Media from "react-media";

interface ProfileContentPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  posts: Array<PostType>;
  id: string;
}

const ProfileContent = (props: ProfileContentPropsType) => {
  let [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);
  let [postPhoto, setPostPhoto] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  let currentAccount = props?.accounts ? props.accounts.find((account: AccountType) => (account?.data() && props?.id ? account?.data()?.id === props?.id : undefined)) : undefined;
  let oftenCheckOtherProfile = currentAccount?.data() && props?.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostPhoto(null);
  };

  return (
    <div className={styles.profile_content}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <NavLink exact to={`${profileConstant.path}/${props?.id}`} className={styles.item} activeClassName={styles.item_active}>
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
          <NavLink to={`${profileConstant.path}/${props?.id}/information`} className={styles.item} activeClassName={styles.item_active}>
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
          {props?.id === props?.account?.id ? (
            <NavLink exact to={`${profileConstant.path}/${props?.id}/saved`} className={styles.item} activeClassName={styles.item_active}>
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
          path={`${profileConstant.path}/${props?.id}`}
          render={() => {
            return <Posts accounts={props.accounts} account={props.account} posts={props.posts} id={props.id} handleOpen={handleOpen} openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} />;
          }}
        />

        <Route path={`${profileConstant.path}/${props?.id}/information`} render={() => <Information {...props} currentAccount={currentAccount} oftenCheckOtherProfile={oftenCheckOtherProfile} />} />

        {props?.id === props?.account?.id ? <Route exact path={`${profileConstant.path}/${props?.id}/saved`} render={() => <Saved account={props.account} posts={props.posts} id={props.id} openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} />} /> : undefined}
      </div>

      {/* toggle show create post container */}
      <CreatePost {...props} open={open} postPhoto={postPhoto} handleClose={handleClose} getUniqueGeneratedIdPost={getUniqueGeneratedIdPost} setPostPhoto={setPostPhoto} />
    </div>
  );
};

export default ProfileContent;
