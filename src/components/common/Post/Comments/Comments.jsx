import React from "react";
import styles from "./Comments.module.css";
import Comment from "./Comment/Comment";
import { NavLink } from "react-router-dom";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Comments = (props) => {
  const [fullDes, setFullDes] = React.useState(false);

  return (
    <div className={!props.modal ? styles.comment_content : styles.comment_content_modal}>
      {/* description */}
      {props.post && props.post.description ? (
        <List className={!props.modal ? styles.wrapper_description : styles.wrapper_description__modal}>
          <ListItem className={styles.list_item}>
            <ListItemText
              className={styles.list_item__text}
              primary={
                <React.Fragment>
                  <NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.currentAccount && props.account.id !== props.currentAccount.id ? props.currentAccount.id : ""}`}>
                    {props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
                  </NavLink>

                  {props.post && props.post.description && props.post.description.length <= 100 ? (
                    props.post.description
                  ) : (
                    <>
                      <span className={styles.short_description}>{fullDes ? props.post.description : props.post.description.slice(0, 100) + "..."}</span>
                      {!fullDes ? (
                        <button
                          className={styles.button_more_text}
                          onClick={() => {
                            setFullDes(true);
                          }}>
                          more
                        </button>
                      ) : undefined}
                    </>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      ) : undefined}

      {/* comments */}
      {props.post && props.post.comments && props.modal ? props.post.comments.map((comment) => <Comment {...props} key={comment.id} post={props.post} comment={comment} accounts={props.accounts} />) : undefined}

      {props.post && props.post.comments && props.post.comments.length > 0 && !props.modal ? <div onClick={() => props.history.push(`${photoConstant}/${props.post.id}`)} className={styles.button_more_comments}>{`View all comments: ${props.post.comments.length}`}</div> : undefined}
    </div>
  );
};

export default Comments;
