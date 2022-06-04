import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";
import styles from "./Comment.module.scss";

const Comment = (props) => {
  const [fullDes, setFullDes] = React.useState(false);

  return (
    <div className={styles.comment}>
      <div className={!props.modal ? styles.comment_content : styles.comment_content_modal}>
        {props?.post?.description ? (
          <div>
            <NavLink className={styles.full_name_comment} to={`${profileConstant.path}/${props?.currentAccount?.id}`}>
              {props?.currentAccount ? props?.currentAccount?.surname + " " + props?.currentAccount?.name : undefined}
            </NavLink>
            <span className={styles.description}>
              {props?.post?.description && props?.post?.description.length <= 100 ? (
                props?.post?.description
              ) : (
                <>
                  <span className={styles.description}>{fullDes ? props?.post?.description : props?.post?.description.slice(0, 100) + "..."}</span>
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
        ) : undefined}
      </div>
    </div>
  );
};

export default Comment;
