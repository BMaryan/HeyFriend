import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";
import styles from "./Comment.module.css";

const Comment = (props) => {
  return (
    <div className={styles.comment}>
      {props.post && props.post.comments ? (
        <div>
          <NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.currentAccount && props.account.id !== props.currentAccount.id ? props.currentAccount.id : ""}`}>
            {props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
          </NavLink>
          <span>{props.comment.comment}</span>
        </div>
      ) : undefined}
    </div>
  );
};

export default Comment;
