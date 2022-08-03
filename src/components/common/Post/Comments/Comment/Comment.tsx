import React from "react";
import { AccountType, CommentType, FirebaseType, LikedOfCommentType, LikedOfPostType, PostType } from "../../../../../types/types";
import { Box, Button, Checkbox, Fade, IconButton, Modal, TextField } from "@mui/material";
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
import { NavLink } from "react-router-dom";
import styles from "./Comment.module.scss";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

// import Timeline from "@mui/lab/Timeline";
// import TimelineItem from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
import Backdrop from "@mui/material/Backdrop";
// import { AnyAaaaRecord } from "dns";

interface CommentPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  post: FirebaseType<PostType> | undefined;
  comment: FirebaseType<CommentType>;
  modal: boolean;
  deleteCommentThunk: (comment: CommentType) => void;
  updateCommentThunk: (comment: CommentType) => void;
}

const Comment = (props: CommentPropsType) => {
  const [open, setOpen] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);
  const [openAnswer, setOpenAnswer] = React.useState(false);
  const accountOfComment: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (account?.id === props?.comment?.data()?.accountId ? account : undefined)) : undefined;
  const checkClickFavoriteBorder = props?.post?.data()?.liked?.length !== 0 ? props?.comment?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.comment}>
      {props?.comment?.data()?.comment ? (
        <ListItem className={!props.modal ? styles.comment_content : styles.comment_content_modal} alignItems="flex-start">
          <ListItemAvatar>
            <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
              <Avatar src={accountOfComment?.data()?.avatar} alt="" />
            </NavLink>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
                <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                  {/* {props?.comment?.dateCreated?.toDate()?.toDateString() + " " + props?.comment?.dateCreated?.toDate()?.toLocaleTimeString()} */}
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
                    <Checkbox className={styles.icon} onClick={() => setOpenAnswer(!openAnswer)} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                    {props?.comment?.data()?.answered && (props?.comment?.data()?.answered?.length as number) > 0 ? props?.comment?.data()?.answered?.length : 0} {props?.comment?.data()?.answered && (props?.comment?.data()?.answered?.length as number) > 1 ? "answeres" : "answer"}
                  </Typography>
                </Typography>
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

      {openAnswer ? (
        // !props.modal ? (
        //   history.push(`${photoConstant.path}/${props.post.id}`)
        // ) : (
        // <Timeline>
        //   <TimelineItem className={styles.timeline_item}>
        //     <TimelineSeparator>
        //       <NavLink to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
        //         <Avatar src={accountOfComment?.data()?.avatar} alt="" />
        //       </NavLink>
        //       <TimelineConnector />
        //     </TimelineSeparator>

        //     <TimelineContent className={styles.timeline_content}>
        //       <ListItemText
        //         primary={
        //           <Typography sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} component="div">
        <TextField style={{ margin: "0 20px" }} id="standard-basic" label="Answer on comment" variant="standard" />
      ) : // )
      //           {/* </Typography>
      //         }
      //       />
      //     </TimelineContent>
      //   </TimelineItem>
      // </Timeline> */}
      undefined}
    </div>
  );
};

export default Comment;

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
//                   {props?.comment?.answered?.length > 0 ? props?.comment?.answered?.length : 0} {props?.comment?.answered?.length > 1 ? "answeres" : "answer"}
//                 </Typography>
//               </Typography>
//             </React.Fragment>
//           }
//         />
//       </TimelineContent>
//     </TimelineItem>
//   </Timeline>
// ) : undefined}
