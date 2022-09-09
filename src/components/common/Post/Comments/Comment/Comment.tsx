import React from "react";
import { AccountType, CommentType, FirebaseType, HistoryType, LikedOfCommentType, LikedOfPostType, PostType, ReplyType } from "../../../../../types/types";
import { mainConstant, profileConstant } from "../../../../../core/constants/constants";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ListDateWithIcon from "../../../../atoms/ListDateWithIcon/ListDateWithIcon";
import ListDescription from "../../../../atoms/ListDescription/ListDescription";
import betaVershion from "../../../../../assets/images/betaVershion.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomModal from "../../../../organisms/Modal/Modal";
import CustomAvatar from "../../../../atoms/Avatar/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import stylesCommon from "../../Post.module.scss";
import { Button, Checkbox } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styles from "./Comment.module.scss";
import { red } from "@mui/material/colors";
import Reply from "./Reply/Reply";

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
  history: HistoryType;
  setReplyOfComment: (value: CommentType | null) => void;
  setAnswerComment: (value: CommentType | null) => void;
  deleteCommentThunk: (comment: CommentType) => void;
  updateCommentThunk: (comment: CommentType) => void;
  updateReplyThunk: (reply: ReplyType) => void;
  deleteReplyThunk: (reply: ReplyType) => void;
}

const Comment = (props: CommentPropsType) => {
  const [open, setOpen] = React.useState(false);

  const checkMain = props.history.location.pathname === mainConstant.path;
  const accountOfComment: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.id === props?.comment?.data()?.accountId ? account : undefined)) : undefined;
  const checkClickFavoriteBorder = props?.comment?.data()?.liked?.length !== 0 ? props?.comment?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;

  const currentRepliesOfComment: Array<FirebaseType<ReplyType>> = props.replies.filter((reply: FirebaseType<ReplyType>) => reply.data().commentId === props.comment.id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.comment}>
      {props?.comment?.data()?.comment ? (
        <ListItem className={!props.modal ? styles.comment_content : styles.comment_content_modal} alignItems="flex-start">
          <ListItemAvatar>
            <NavLink to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>{accountOfComment && <CustomAvatar avatarData={accountOfComment?.data()} />}</NavLink>
          </ListItemAvatar>

          <ListItemText
            className={stylesCommon.details_position_text}
            primary={<ListDateWithIcon data={props.comment.data()} onClick={handleOpen} />}
            secondary={
              <Typography component="div">
                {/* description */}
                <ListDescription accountOfDescription={accountOfComment?.data()} data={props?.comment?.data()} />

                {/* icons */}
                <Typography sx={{ display: "flex", justifyContent: "space-between" }} component="div">
                  <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                    <Checkbox className={styles.icon} onClick={() => (!checkClickFavoriteBorder ? props?.comment && props?.updateCommentThunk({ ...props?.comment?.data(), liked: props?.comment?.data()?.liked ? [...(props?.comment?.data()?.liked as Array<any>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.comment && props?.updateCommentThunk({ ...props?.comment?.data(), liked: props?.comment?.data()?.liked ? props?.comment?.data()?.liked?.filter((commentLike: LikedOfCommentType) => commentLike?.id !== props?.account?.id) : [] }))} color="default" icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
                    {props?.comment?.data()?.liked && (props?.comment?.data()?.liked?.length as number) > 0 ? props?.comment?.data()?.liked?.length : 0} {props?.comment?.data()?.liked && (props?.comment?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
                  </Typography>

                  {props.account?.id !== props.comment.data().accountId && (
                    <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                      <Checkbox className={styles.icon} onClick={() => props.account && props.setReplyOfComment(!props.replyOfComment ? { ...props.comment.data(), accountId: props.account.id } : null)} color="default" icon={!props.replyOfComment ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={props.replyOfComment ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                      {currentRepliesOfComment && (currentRepliesOfComment?.length as number) > 0 ? currentRepliesOfComment?.length : 0} {currentRepliesOfComment && (currentRepliesOfComment?.length as number) > 1 ? "replies" : "reply"}
                    </Typography>
                  )}
                </Typography>

                {/* replies */}
                {currentRepliesOfComment.length > 0 && !checkMain && (
                  <Typography component={"div"}>
                    <Accordion>
                      <AccordionSummary className={styles.accordion_summary} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Review replies ({currentRepliesOfComment.length})</Typography>
                      </AccordionSummary>

                      {currentRepliesOfComment.map((reply: FirebaseType<ReplyType>) => (
                        <AccordionDetails key={reply.id}>
                          <Reply accounts={props.accounts} account={props.account} reply={reply} post={props.post} currentAccount={props.currentAccount} currentRepliesOfComment={currentRepliesOfComment} updateReplyThunk={props.updateReplyThunk} deleteReplyThunk={props.deleteReplyThunk} />
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  </Typography>
                )}
              </Typography>
            }
          />
        </ListItem>
      ) : undefined}

      {/* modal for editing comment */}
      <CustomModal className={stylesCommon.modalPostActions} open={open} handleClose={handleClose}>
        {props.account?.id === props.post?.data().accountId ? (
          <>
            {props?.account?.id !== props?.comment?.data()?.accountId && (
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
                props.comment && props.deleteCommentThunk(props.comment.data());
              }}>
              Delete
            </Button>
            <Button className={stylesCommon.item} variant="text" fullWidth onClick={handleClose}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            {props.account?.id !== props.comment.data().accountId ? (
              <Button className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red} color="error" fullWidth variant="text">
                <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                Report
              </Button>
            ) : (
              <Button
                color="error"
                fullWidth
                onClick={() => {
                  props.comment && props.deleteCommentThunk(props.comment.data());
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

export default Comment;
