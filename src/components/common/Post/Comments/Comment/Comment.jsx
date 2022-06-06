import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";
import styles from "./Comment.module.scss";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Checkbox, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Comment = (props) => {
  const [openAnswer, setOpenAnswer] = React.useState(false);
  const [fullDes, setFullDes] = React.useState(false);
  let accountOfComment = props?.accounts ? props?.accounts?.find((account) => (account?.id === props?.comment?.accountId ? account : undefined)) : undefined;
  let checkClickFavoriteBorder = props?.post?.liked?.length !== 0 ? props?.comment?.liked?.find((comment) => comment?.id === props?.account?.id) : undefined;

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
                  <IconButton className={styles.button_icon}>
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
                    {props?.comment?.answered?.length > 0 ? props?.comment?.answered?.length : 0} {props?.comment?.answered?.length > 1 ? "answeres" : "answere"}
                  </Typography>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ) : undefined}

      {openAnswer ? (
        <ListItem className={!props.modal ? styles.comment_content : styles.comment_content_modal} alignItems="flex-start">
          <ListItemAvatar style={{ marginLeft: "20px" }}>
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
                  <IconButton className={styles.button_icon}>
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
                    {props?.comment?.liked?.length > 0 ? props?.comment?.liked?.length : 0} likes
                  </Typography>

                  <Typography sx={{ display: "inline" }} component="span" variant="subtitle2" color="text.primary">
                    <Checkbox className={styles.icon} onClick={() => setOpenAnswer(!openAnswer)} color="default" icon={true ? <QuestionAnswerOutlinedIcon fontSize="small" /> : <QuestionAnswerIcon fontSize="small" />} checkedIcon={true ? <QuestionAnswerIcon fontSize="small" /> : <QuestionAnswerOutlinedIcon fontSize="small" />} />
                  </Typography>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ) : undefined}
    </div>
  );
};

export default Comment;

{
  /* {props?.comment?.comment ? (
          <div>
            <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${accountOfComment ? accountOfComment?.data()?.id : props?.currentAccount?.id}`}>
              {accountOfComment ? accountOfComment?.data()?.surname + " " + accountOfComment?.data()?.name : undefined}
            </NavLink>
            <span className={styles.description}>
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
            </span>
          </div>
        ) : undefined} */
}
{
  /* </div> */
}
