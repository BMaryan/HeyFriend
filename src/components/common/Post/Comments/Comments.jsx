import React from "react";
import styles from "./Comments.module.css";
import Comment from "./Comment/Comment";
import { NavLink, Redirect } from "react-router-dom";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import { defaultPostConstant } from "../../../../core/constants/constantsPost";

const Comments = (props) => {
  const [fullDes, setFullDes] = React.useState(false);

  return (
    <div className={!props.modal ? styles.comment_content : styles.comment_content_modal}>
      {/* description */}
      {props.post && props.post.description ? (
        <div className={styles.wrapper_description}>
          <NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.currentAccount && props.account.id !== props.currentAccount.id ? props.currentAccount.id : ""}`}>
            {props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
          </NavLink>
          <span>
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
          </span>
        </div>
      ) : undefined}

      {/* comments */}
      {props.post && props.post.comments && props.modal ? props.post.comments.map((comment) => <Comment {...props} key={comment.id} post={props.post} comment={comment} />) : undefined}

      {props.post && props.post.comments && props.post.comments.length > 0 && !props.modal ? <div onClick={() => props.history.push(`${photoConstant}/${props.post.id}`)} className={styles.button_more_comments}>{`View all comments: ${props.post.comments.length}`}</div> : undefined}
    </div>
  );
};

export default Comments;
