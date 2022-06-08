import React from "react";
import { NavLink } from "react-router-dom";
import { photoConstant, profileConstant } from "../../../../../core/constants/constants";
import styles from "./Comment.module.scss";
import stylesCommon from "../../Post.module.scss";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, Checkbox, Fade, IconButton, Modal, TextField } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import betaVershion from "../../../../../assets/images/betaVershion.png";

//
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Backdrop from "@mui/material/Backdrop";
import { useHistory } from "react-router-dom";

const Comment = (props) => {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openAnswer, setOpenAnswer] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);
  let accountOfComment = props?.accounts ? props?.accounts?.find((account) => (account?.id === props?.comment?.accountId ? account : undefined)) : undefined;
  let checkClickFavoriteBorder = props?.post?.liked?.length !== 0 ? props?.comment?.liked?.find((comment) => comment?.id === props?.account?.id) : undefined;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.comment}>
      {props?.comment?.comment ? (
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
                  {props?.comment?.dateCreated.toDate().toDateString() + " " + props?.comment?.dateCreated.toDate().toLocaleTimeString()}
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
                  {props?.comment?.comment && props?.comment?.comment.length <= 100 ? (
                    props?.comment?.comment
                  ) : (
                    <>
                      <span className={styles.description}>{fullDes ? props?.comment?.comment : props?.comment?.comment.slice(0, 100) + "..."}</span>
                      <button
                        className={styles.button_more}
                        onClick={(e) => {
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
                    <Checkbox className={styles.icon} onClick={() => (!checkClickFavoriteBorder ? props?.updateCommentThunk({ ...props?.comment, liked: props?.comment?.liked ? [...props?.comment?.liked, { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updateCommentThunk({ ...props?.comment, liked: props?.comment?.liked ? props?.comment?.liked?.filter((commentLike) => commentLike?.id !== props?.account?.id) : [] }))} color="default" icon={!checkClickFavoriteBorder ? <FavoriteBorder fontSize="small" /> : <Favorite sx={{ color: red[600] }} fontSize="small" />} checkedIcon={checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} fontSize="small" /> : <FavoriteBorder fontSize="small" />} />
                    {props?.comment?.liked?.length > 0 ? props?.comment?.liked?.length : 0} {props?.comment?.liked?.length > 1 ? "likes" : "like"}
                  </Typography>

                  <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                    <Checkbox className={styles.icon} onClick={() => setOpenAnswer(!openAnswer)} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                    {props?.comment?.answered?.length > 0 ? props?.comment?.answered?.length : 0} {props?.comment?.answered?.length > 1 ? "answeres" : "answer"}
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
            {props?.account?.id === props?.post?.accountId ? (
              <>
                {props?.account?.id !== props?.comment?.accountId && (
                  <Button variant="text" className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}>
                    <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Report
                  </Button>
                )}

                <Button
                  onClick={() => {
                    props.deleteCommentThunk(props.comment);
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
                {props?.account?.id !== props?.comment?.accountId ? (
                  <Button variant="text" className={stylesCommon.item + " " + stylesCommon.item__border + " " + stylesCommon.item__red}>
                    <img className={stylesCommon.item_beta_vershion_picture} src={betaVershion} alt="" />
                    Report
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      props.deleteCommentThunk(props.comment);
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
