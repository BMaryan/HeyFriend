import React from "react";
import { AccountType, FirebaseType, FollowersOfAccountType, FollowingOfAccountType, HistoryType, PostType } from "../../../../types/types";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import { ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import betaVershion from "../../../../assets/images/betaVershion.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomModal from "../../../organisms/Modal/Modal";
import CustomAvatar from "../../../atoms/Avatar/Avatar";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "../Post.module.scss";

interface HeadPostPropsType {
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  post: FirebaseType<PostType> | undefined;
  history: HistoryType;
  modal: boolean;
  updateAccountThunk: (account: AccountType) => void;
  deletePostThunk: (post: PostType) => void;
}

const HeadPost = (props: HeadPostPropsType) => {
  const [open, setOpen] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);

  // if modal is true than to show full description
  React.useEffect(() => {
    if (props.modal) {
      setFullDes(true);
    }
  }, [props.modal]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.head}>
      <div className={styles.wrapper_details}>
        <ListItem className={styles.details_position} alignItems="flex-start">
          <ListItemAvatar className={styles.details_position_avatar}>
            <NavLink to={`${profileConstant.path}/${props?.currentAccount?.data()?.id}`}>{props?.currentAccount && <CustomAvatar avatarData={props?.currentAccount?.data()} />}</NavLink>
          </ListItemAvatar>

          <ListItemText
            className={styles.details_position_text}
            primary={
              <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
                <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                  <NavLink to={`${profileConstant.path}/${props?.currentAccount?.data()?.id}`} className={styles.fullName}>
                    {props?.currentAccount?.data()?.surname + " " + props?.currentAccount?.data()?.name}
                  </NavLink>
                </Typography>

                <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                  <IconButton onClick={handleOpen} className={styles.button_icon}>
                    <MoreHorizIcon className={styles.icon} />
                  </IconButton>
                </Typography>
              </Typography>
            }
            secondary={
              <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                {props?.post?.data()?.dateCreated ? <span className={styles.date}>{props?.post?.data()?.dateCreated?.toDate()?.toLocaleDateString() + " " + props?.post?.data()?.dateCreated?.toDate()?.toLocaleTimeString()}</span> : undefined}
              </Typography>
            }
          />
        </ListItem>

        <CustomModal className={styles.modalPostActions} open={open} handleClose={handleClose}>
          {props?.account?.id === props?.currentAccount?.data()?.id ? (
            <>
              <Button
                onClick={() => {
                  props?.post && props.deletePostThunk(props?.post?.data());
                  props.history.push(`${profileConstant.path}/${props?.account?.id}`);
                }}
                className={styles.item + " " + styles.item__border + " " + styles.item__red}
                variant="text">
                Delete
              </Button>
              <Button
                variant="text"
                className={styles.item + " " + styles.item__border}
                onClick={() => {
                  props.history.push(`${photoConstant.path}/${props?.post?.id}`);
                  handleClose();
                }}>
                Go to post
              </Button>
              <Button onClick={handleClose} variant="text" className={styles.item}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" className={styles.item + " " + styles.item__border + " " + styles.item__red}>
                <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                Report
              </Button>
              <Button
                variant="text"
                className={styles.item + " " + styles.item__border + " " + styles.item__red}
                onClick={() => {
                  // remove a person from following
                  props.account && props.updateAccountThunk({ ...props.account, following: props.account?.following ? props.account?.following.filter((following: FollowingOfAccountType) => following?.id !== props.currentAccount?.id) : [] });

                  // remove a person from followers
                  props.currentAccount?.data() && props.updateAccountThunk({ ...props.currentAccount?.data(), followers: props.currentAccount?.data()?.followers ? props.currentAccount?.data()?.followers?.filter((followers: FollowersOfAccountType) => followers?.id !== props.account?.id) : [] });

                  // close a modal
                  handleClose();
                }}>
                Unfollow
              </Button>
              <Button variant="text" className={styles.item + " " + styles.item__border}>
                <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                Share to...
              </Button>
              <Button variant="text" className={styles.item + " " + styles.item__border}>
                <img className={styles.item_beta_vershion_picture} src={betaVershion} alt="" />
                Copy link
              </Button>
              <Button onClick={handleClose} variant="text" className={styles.item}>
                Cancel
              </Button>
            </>
          )}
        </CustomModal>
      </div>

      {/* description */}
      {!props.modal && props?.post?.data()?.description && <div className={styles.wrapper_description}>{props?.post?.data()?.description ? <div className={styles.description}>{props?.post?.data()?.description?.length <= 100 ? props?.post?.data()?.description : fullDes ? props?.post?.data()?.description : props?.post?.data()?.description?.slice(0, 100) + " ..."}</div> : undefined}</div>}
    </div>
  );
};

export default HeadPost;
