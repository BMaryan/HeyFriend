import React from "react";
import { AccountType, FirebaseType, LikedOfPostType, PostType, ReplyType } from "../../../../../../types/types";
import ListDateWithIcon from "../../../../../atoms/ListDateWithIcon/ListDateWithIcon";
import ListDescription from "../../../../../atoms/ListDescription/ListDescription";
import { profileConstant } from "../../../../../../core/constants/constants";
import betaVershion from "../../../../../../assets/images/betaVershion.png";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CustomModal from "../../../../../organisms/Modal/Modal";
import CustomAvatar from "../../../../../atoms/Avatar/Avatar";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import ListItemText from "@mui/material/ListItemText";
import stylesCommon from "../../../Post.module.scss";
import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import { Button, Checkbox } from "@mui/material";
import { NavLink } from "react-router-dom";
import { red } from "@mui/material/colors";
import styles from "./Reply.module.scss";
import Timeline from "@mui/lab/Timeline";

interface ReplyPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  post: FirebaseType<PostType> | undefined;
  reply: FirebaseType<ReplyType>;
  currentRepliesOfComment: Array<FirebaseType<ReplyType>>;
  updateReplyThunk: (reply: ReplyType) => void;
  deleteReplyThunk: (reply: ReplyType) => void;
}

const Reply = (props: ReplyPropsType) => {
  const [open, setOpen] = React.useState(false);
  const accountOfReply: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.id === props.reply?.data()?.accountId ? account : undefined)) : undefined;
  const checkClickFavoriteBorder = accountOfReply ? props?.reply?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.reply}>
      <Timeline className={styles.timeline}>
        <TimelineItem className={styles.timeline_item}>
          {/* separator */}
          <TimelineSeparator className={styles.timeline_separator}>
            <NavLink to={`${profileConstant.path}/${accountOfReply ? accountOfReply?.data()?.id : props?.currentAccount?.id}`}>{accountOfReply && <CustomAvatar avatarData={accountOfReply?.data()} />}</NavLink>
            <TimelineConnector />
          </TimelineSeparator>

          {/* content */}
          <TimelineContent className={styles.timeline_content}>
            <ListItemText
              primary={<ListDateWithIcon data={props.reply.data()} onClick={handleOpen} />}
              secondary={
                <Typography component="div">
                  {/* description */}
                  <ListDescription accountOfDescription={accountOfReply?.data()} data={props?.reply?.data()} />

                  {/* icon */}
                  <Typography color="text.primary" variant="subtitle2" component="span">
                    <Checkbox className={styles.icon} color="default" onClick={() => (!checkClickFavoriteBorder ? props?.reply && props?.updateReplyThunk({ ...props?.reply?.data(), liked: props?.reply?.data()?.liked ? [...(props?.reply?.data()?.liked as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.reply && props?.updateReplyThunk({ ...props?.reply?.data(), liked: props?.reply?.data()?.liked ? props?.reply?.data()?.liked?.filter((replyLike: LikedOfPostType) => replyLike?.id !== props?.account?.id) : [] }))} icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
                    {props?.reply?.data()?.liked && (props?.reply?.data()?.liked?.length as number) > 0 ? props?.reply?.data()?.liked?.length : 0} {props?.reply?.data()?.liked && (props?.reply?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
                  </Typography>
                </Typography>
              }
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      {/* modal for editing reply */}
      <CustomModal className={stylesCommon.modalPostActions} open={open} handleClose={handleClose}>
        {props.account?.id === props.post?.data().accountId ? (
          <>
            {props?.account?.id !== props?.reply?.data()?.accountId && (
              <Button className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red} color="error" fullWidth variant="text">
                <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                Report
              </Button>
            )}

            <Button
              className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}
              color="error"
              variant="text"
              fullWidth
              onClick={() => {
                props.reply && props.deleteReplyThunk(props.reply.data());
              }}>
              Delete
            </Button>
            <Button className={stylesCommon.item} variant="text" fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {props.account?.id !== props.reply.data().accountId ? (
              <Button className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red} color="error" fullWidth variant="text">
                <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                Report
              </Button>
            ) : (
              <Button
                color="error"
                fullWidth
                onClick={() => {
                  props.reply && props.deleteReplyThunk(props.reply.data());
                }}
                className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}
                variant="text">
                Delete
              </Button>
            )}
            <Button fullWidth onClick={handleClose} variant="text" className={stylesCommon.item}>
              Cancel
            </Button>
          </>
        )}
      </CustomModal>
    </div>
  );
};

export default Reply;
