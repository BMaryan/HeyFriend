import React from "react";
import { AccountType, CommentType, FirebaseType, LikedOfCommentType, LikedOfPostType, PostType, ReplyType } from "../../../../../types/types";
import { Box, Button, Checkbox, Fade, IconButton, Modal } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { profileConstant } from "../../../../../core/constants/constants";
import betaVershion from "../../../../../assets/images/betaVershion.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import stylesCommon from "../../Post.module.scss";
import ListItem from "@mui/material/ListItem";
import Backdrop from "@mui/material/Backdrop";
import { NavLink } from "react-router-dom";
import styles from "./Comment.module.scss";
import { red } from "@mui/material/colors";
import Reply from "./Reply/Reply";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomAvatar from "../../../../atoms/Avatar/Avatar";

interface CommentPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  post: FirebaseType<PostType> | undefined;
  comment: FirebaseType<CommentType>;
  replies: Array<FirebaseType<ReplyType>>;
  modal: boolean;
  replyOfComment: CommentType | null;
  answerComment: CommentType | null;
  setReplyOfComment: (value: CommentType | null) => void;
  setAnswerComment: (value: CommentType | null) => void;
  deleteCommentThunk: (comment: CommentType) => void;
  updateCommentThunk: (comment: CommentType) => void;
}

const Comment = (props: CommentPropsType) => {
  const [open, setOpen] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);
  const accountOfComment: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.id === props?.comment?.data()?.accountId ? account : undefined)) : undefined;
  const checkClickFavoriteBorder = props?.post?.data()?.liked?.length !== 0 ? props?.comment?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;

  const currentRepliesOfComment: Array<FirebaseType<ReplyType>> = props.replies.filter((reply: FirebaseType<ReplyType>) => reply.data().commentId === props.comment.id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.comment}>
      {props?.comment?.data()?.comment ? (
        <ListItem className={!props.modal ? styles.comment_content : styles.comment_content_modal} alignItems="flex-start">
          <ListItemAvatar>
            <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
              {accountOfComment && <CustomAvatar avatarData={accountOfComment?.data()} />}
            </NavLink>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
                <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                  {props.comment.data()?.dateCreated?.toDate()?.toDateString() + " " + props.comment.data()?.dateCreated?.toDate()?.toLocaleTimeString()}
                </Typography>

                <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                  <IconButton className={styles.button_icon} onClick={handleOpen}>
                    <MoreHorizIcon fontSize="small" className={styles.icon} />
                  </IconButton>
                </Typography>
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                  <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
                    {accountOfComment?.data()?.surname + " " + accountOfComment?.data()?.name}
                  </NavLink>
                </Typography>

                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  {props?.comment?.data()?.comment?.length <= 100 ? (
                    props?.comment?.data()?.comment
                  ) : (
                    <>
                      <span className={styles.description}>{fullDes ? props?.comment?.data()?.comment : props?.comment?.data()?.comment?.slice(0, 100) + "..."}</span>
                      <button
                        className={styles.button_more}
                        onClick={(e: React.MouseEvent<HTMLButtonElement> & React.ChangeEvent<HTMLButtonElement>) => {
                          setFullDes(true);
                          e.target.hidden = true;
                        }}>
                        more
                      </button>
                    </>
                  )}
                </Typography>

                <Typography sx={{ display: "flex", justifyContent: "space-between" }} component="span">
                  <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                    <Checkbox className={styles.icon} onClick={() => (!checkClickFavoriteBorder ? props?.comment && props?.updateCommentThunk({ ...props?.comment?.data(), liked: props?.comment?.data()?.liked ? [...(props?.comment?.data()?.liked as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.comment && props?.updateCommentThunk({ ...props?.comment?.data(), liked: props?.comment?.data()?.liked ? props?.comment?.data()?.liked?.filter((commentLike: LikedOfCommentType) => commentLike?.id !== props?.account?.id) : [] }))} color="default" icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
                    {props?.comment?.data()?.liked && (props?.comment?.data()?.liked?.length as number) > 0 ? props?.comment?.data()?.liked?.length : 0} {props?.comment?.data()?.liked && (props?.comment?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
                  </Typography>

                  <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                    <Checkbox className={styles.icon} onClick={() => props.setReplyOfComment(props.comment.data())} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                    {currentRepliesOfComment && (currentRepliesOfComment?.length as number) > 0 ? currentRepliesOfComment?.length : 0} {currentRepliesOfComment && (currentRepliesOfComment?.length as number) > 1 ? "replies" : "reply"}
                  </Typography>
                </Typography>

                {currentRepliesOfComment.length > 0 && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography>Review replies ({currentRepliesOfComment.length})</Typography>
                    </AccordionSummary>
                    {currentRepliesOfComment.map((reply: FirebaseType<ReplyType>) => (
                      <Typography key={reply.id} component="span">
                        <AccordionDetails>
                          <Reply key={reply.id} accounts={props.accounts} account={props.account} reply={reply} currentAccount={props.currentAccount} currentRepliesOfComment={currentRepliesOfComment} />
                        </AccordionDetails>
                      </Typography>
                    ))}
                  </Accordion>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ) : undefined}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box className={stylesCommon.modalPostActions}>
            {props?.account?.id === props?.post?.data()?.accountId ? (
              <>
                {props?.account?.id !== props?.comment?.data()?.accountId && (
                  <Button variant="text" className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}>
                    <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Report
                  </Button>
                )}

                <Button
                  onClick={() => {
                    props.comment && props.deleteCommentThunk(props.comment.data());
                  }}
                  className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}
                  variant="text">
                  Delete
                </Button>
                <Button onClick={handleClose} variant="text" className={stylesCommon.item}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {props?.account?.id !== props?.comment?.data()?.accountId ? (
                  <Button variant="text" className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}>
                    <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Report
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      props.comment && props.deleteCommentThunk(props.comment.data());
                    }}
                    className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}
                    variant="text">
                    Delete
                  </Button>
                )}
                <Button onClick={handleClose} variant="text" className={stylesCommon.item}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Comment;
