import React from "react";
// import { AccountType, CommentType, FirebaseType, LikedOfCommentType, LikedOfPostType, PostType, ReplyType } from "../../../../../types/types";
import { Box, Button, Checkbox, Fade, IconButton, Modal, TextField } from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
// import { profileConstant } from "../../../../../core/constants/constants";
import betaVershion from "../../../../../assets/images/betaVershion.png";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import stylesCommon from "../../Post.module.scss";
import ListItem from "@mui/material/ListItem";
import { NavLink } from "react-router-dom";
import styles from "./Reply.module.scss";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { AccountType, FirebaseType, LikedOfPostType, ReplyType } from "../../../../../../types/types";
import { profileConstant } from "../../../../../../core/constants/constants";
import moment from "moment";
import CustomAvatar from "../../../../../atoms/Avatar/Avatar";

interface ReplyPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  // post: FirebaseType<PostType> | undefined;
  // comment: FirebaseType<CommentType>;
  // replies: Array<FirebaseType<ReplyType>>;
  // modal: boolean;
  // replyOfComment: CommentType | null;
  // answerComment: CommentType | null;
  // setReplyOfComment: (value: CommentType | null) => void;
  // setAnswerComment: (value: CommentType | null) => void;
  // deleteCommentThunk: (comment: CommentType) => void;
  // updateCommentThunk: (comment: CommentType) => void;
  reply: FirebaseType<ReplyType>;
  currentRepliesOfComment: Array<FirebaseType<ReplyType>>;
}

const Reply = (props: ReplyPropsType) => {
  // const [open, setOpen] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);
  const accountOfReply: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.id === props.reply?.data()?.accountId ? account : undefined)) : undefined;
  const checkClickFavoriteBorder = accountOfReply ? props?.reply?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div className={styles.reply}>
      {true ? (
        // <Timeline className={styles.timeline}>
        //   <TimelineItem className={styles.timeline_item}>
        //     <TimelineSeparator>
        //       <NavLink to={`${profileConstant.path}/${accountOfReply ? accountOfReply?.data()?.id : props?.currentAccount?.id}`}>
        //         <Avatar src={accountOfReply?.data()?.avatar} alt="" />
        //       </NavLink>
        //       <TimelineConnector />
        //     </TimelineSeparator>

        //     <TimelineContent className={styles.timeline_content}>
        //       <ListItemText
        //         primary={
        //           <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="span">
        //             {props.reply?.data()?.reply}
        //           </Typography>
        //         }
        //       />
        //     </TimelineContent>
        //   </TimelineItem>
        // </Timeline>

        <Timeline className={styles.timeline}>
          <TimelineItem className={styles.timeline_item}>
            <TimelineSeparator>
              <NavLink to={`${profileConstant.path}/${accountOfReply ? accountOfReply?.data()?.id : props?.currentAccount?.id}`}>{accountOfReply && <CustomAvatar avatarData={accountOfReply?.data()} />}</NavLink>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent className={styles.timeline_content}>
              <ListItemText
                primary={
                  <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
                    <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                      {moment(props?.reply?.data()?.dateCreated.toDate()).fromNow()}
                    </Typography>

                    <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                      <IconButton className={styles.button_icon}>
                        <MoreHorizIcon fontSize="small" className={styles.icon} />
                      </IconButton>
                    </Typography>
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
                      <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfReply ? accountOfReply?.data()?.id : props?.currentAccount?.id}`}>
                        {accountOfReply?.data()?.surname + " " + accountOfReply?.data()?.name}
                      </NavLink>
                    </Typography>

                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      {props?.reply?.data()?.reply && props?.reply?.data()?.reply.length <= 100 ? (
                        props?.reply?.data()?.reply
                      ) : (
                        <>
                          <span className={styles.description}>{fullDes ? props?.reply?.data()?.reply : props?.reply?.data()?.reply.slice(0, 100) + "..."}</span>
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

                    {/* <Typography sx={{ display: "flex", justifyContent: "space-between" }} component="span"> */}
                    <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                      <Checkbox className={styles.icon} color="default" icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
                      {props?.reply?.data()?.liked && (props?.reply?.data()?.liked?.length as number) > 0 ? props?.reply?.data()?.liked?.length : 0} {props?.reply?.data()?.liked && (props?.reply?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
                    </Typography>

                    {/* <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                        <Checkbox className={styles.icon} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                        {props.currentRepliesOfComment && (props.currentRepliesOfComment?.length as number) > 0 ? props.currentRepliesOfComment?.length : 0} {props.currentRepliesOfComment && (props.currentRepliesOfComment?.length as number) > 1 ? "replies" : "reply"}
                      </Typography> */}
                    {/* </Typography> */}
                  </React.Fragment>
                }
              />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ) : undefined}
    </div>
  );
};

export default Reply;

// {openAnswer ? (
//   <Timeline>
//     <TimelineItem className={styles.timeline_item}>
//       <TimelineSeparator>
//         <NavLink to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
//           <Avatar src={accountOfComment?.data()?.avatar} alt="" />
//         </NavLink>
//         <TimelineConnector />
//       </TimelineSeparator>

//       <TimelineContent className={styles.timeline_content}>
//         <ListItemText
//           primary={
//             <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
//               <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
//                 {props?.comment?.dateCreated.toDate().toDateString() + " " + props?.comment?.dateCreated.toDate().toLocaleTimeString()}
//               </Typography>

//               <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
//                 <IconButton className={styles.button_icon}>
//                   <MoreHorizIcon fontSize="small" className={styles.icon} />
//                 </IconButton>
//               </Typography>
//             </Typography>
//           }
//           secondary={
//             <React.Fragment>
//               <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text.primary">
//                 <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
//                   {accountOfComment?.data()?.surname + " " + accountOfComment?.data()?.name}
//                 </NavLink>
//               </Typography>

//               <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
//                 {props?.comment?.comment && props?.comment?.comment.length <= 100 ? (
//                   props?.comment?.comment
//                 ) : (
//                   <>
//                     <span className={styles.description}>{fullDes ? props?.comment?.comment : props?.comment?.comment.slice(0, 100) + "..."}</span>
//                     <button
//                       className={styles.button_more}
//                       onClick={(e) => {
//                         setFullDes(true);
//                         e.target.hidden = true;
//                       }}>
//                       more
//                     </button>
//                   </>
//                 )}
//               </Typography>

//               <Typography sx={{ display: "flex", justifyContent: "space-between" }} component="span">
//                 <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
//                   <Checkbox className={styles.icon} onClick={() => (!checkClickFavoriteBorder ? props?.updateCommentThunk({ ...props?.comment, liked: props?.comment?.liked ? [...props?.comment?.liked, { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updateCommentThunk({ ...props?.comment, liked: props?.comment?.liked ? props?.comment?.liked?.filter((commentLike) => commentLike?.id !== props?.account?.id) : [] }))} color="default" icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
//                   {props?.comment?.liked?.length > 0 ? props?.comment?.liked?.length : 0} {props?.comment?.liked?.length > 1 ? "likes" : "like"}
//                 </Typography>

//                 <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
//                   <Checkbox className={styles.icon} onClick={() => setOpenAnswer(!openAnswer)} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
//                   {props?.comment?.replies?.length > 0 ? props?.comment?.replies?.length : 0} {props?.comment?.replies?.length > 1 ? "answeres" : "answer"}
//                 </Typography>
//               </Typography>
//             </React.Fragment>
//           }
//         />
//       </TimelineContent>
//     </TimelineItem>
//   </Timeline>
// ) : undefined}
