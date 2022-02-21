import React from "react";
import styles from "./Comments.module.css";
import Comment from "./Comment/Comment";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../core/constants/constants";

const Comments = (props) => {
  const [fullDes, setFullDes] = React.useState(false);

  return (
    <div className={!props.modal ? styles.comment_content : styles.comment_content_modal}>
      {/* description */}
      {props.post && props.post.description ? (
        <div>
          <NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.currentAccount && props.account.id !== props.currentAccount.id ? props.currentAccount.id : ""}`}>
            {props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
          </NavLink>
          <span>
            {props.post && props.post.description && props.post.description.length <= 100 ? (
              props.post.description
            ) : (
              <>
                <span className={styles.short_description}>{fullDes ? props.post.description : props.post.description.slice(0, 100) + "..."}</span>
                <button
                  className={styles.button_more}
                  onClick={() => {
                    setFullDes(true);
                  }}>
                  more
                </button>
              </>
            )}
          </span>
        </div>
      ) : undefined}

      {/* comments */}
      {props.post && props.post.comments ? props.post.comments.map((comment) => <Comment {...props} comment={comment} />) : undefined}
    </div>
  );
};

export default Comments;
