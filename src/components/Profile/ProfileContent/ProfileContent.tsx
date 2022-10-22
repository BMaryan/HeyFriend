import React from "react";
import { AccountType, FirebaseType, HistoryType, MediaOfPostType, PostType } from "../../../types/types";
import { informationConstant, profileConstant, savedConstant } from "../../../core/constants/constants";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CreatePost from "../../common/CreatePost/CreatePost";
import Information from "./Information/Information";
import styles from "./ProfileContent.module.scss";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Saved from "./Saved/Saved";
import Posts from "./Posts/Posts";
import Media from "react-media";
// import StepperPerformance from "../../molecules/StepperPerformance/StepperPerformance";

interface ProfileContentPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  id: string;
  history: HistoryType;
  createPostThunk: (post: PostType) => void;
}

const ProfileContent = (props: ProfileContentPropsType) => {
  const [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);
  const [mediasOfPost, setMediasOfPost] = React.useState<Array<MediaOfPostType>>([]);
  const [open, setOpen] = React.useState(false);

  const currentAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props.accounts.find((account: FirebaseType<AccountType>) => (account?.data()?.id === props?.id ? account : undefined)) : undefined;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMediasOfPost([]);
  };

  return (
    <div className={styles.profile_content}>
      <div className={styles.content}>
        {/* <div className={styles.stepper_performance}>
          <StepperPerformance account={props.account} />
        </div> */}

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
          <NavLink to={`${profileConstant.path}/${props?.id}${informationConstant.path}`} className={styles.item} activeClassName={styles.item_active}>
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
            <NavLink exact to={`${profileConstant.path}/${props?.id}${savedConstant.path}`} className={styles.item} activeClassName={styles.item_active}>
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
            return <Posts accounts={props.accounts} account={props.account} posts={props.posts} id={props.id} history={props.history} handleOpen={handleOpen} openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} />;
          }}
        />

        <Route path={`${profileConstant.path}/${props?.id}${informationConstant.path}`} render={() => <Information currentAccount={currentAccount} id={props.id} />} />

        {props?.id === props?.account?.id ? <Route exact path={`${profileConstant.path}/${props?.id}${savedConstant.path}`} render={() => <Saved account={props.account} posts={props.posts} id={props.id} openModalCurrentPost={openModalCurrentPost} setOpenModalCurrentPost={setOpenModalCurrentPost} />} /> : undefined}
      </div>

      {/* toggle show create post container */}
      <CreatePost account={props.account} mediasOfPost={mediasOfPost} open={open} handleClose={handleClose} setMediasOfPost={setMediasOfPost} createPostThunk={props.createPostThunk} />
    </div>
  );
};

export default ProfileContent;
