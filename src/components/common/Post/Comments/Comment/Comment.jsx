import React from "react";
import styles from "./Comment.module.css";
import commonStyles from "../Comments.module.css";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";

const Comment = (props) => {
  return (
    <div className={styles.comment}>
      {props.post && props.post.comments ? (
        <div>
          <NavLink className={commonStyles.full_name_comment} to={`${profileConstant}/${props.currentAccount && props.account.id !== props.currentAccount.id ? props.currentAccount.id : ""}`}>
            {props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
          </NavLink>
          <span>{props.comment.comment}</span>
        </div>
      ) : undefined}
    </div>
  );
};

export default Comment;
