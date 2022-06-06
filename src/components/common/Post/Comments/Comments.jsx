import React from "react";
import styles from "./Comments.module.scss";
import Comment from "./Comment/Comment";
import { useHistory } from "react-router-dom";
import { photoConstant } from "../../../../core/constants/constants";

const Comments = (props) => {
  const history = useHistory();
  const [more, setMore] = React.useState(false);
  let areComments = props?.comments?.filter((comment) => (comment?.data()?.postId === props?.post?.id ? comment : undefined));

  return (
    <div className={styles.comments}>
      {areComments && props.modal ? areComments?.map((comment) => (comment?.data()?.postId === props?.post?.id ? <Comment {...props} key={comment.id} comment={comment?.data()} /> : undefined)) : undefined}

      {areComments && !props.modal ? areComments?.map((comment) => (comment?.data()?.postId === props?.post?.id ? <Comment {...props} key={comment.id} comment={comment?.data()} /> : undefined)).splice(-1) : undefined}

      {areComments.length > 1 && !props.modal ? (
        <button
          className={styles.button_more}
          onClick={(e) => {
            setMore(!more);
            e.target.hidden = true;

            history.push(`${photoConstant.path}/${props?.post?.id}`);
          }}>
          {areComments.length === 2 ? `Review comment: ${areComments.length - 1}` : `Review all comments: ${areComments.length - 1}`}
        </button>
      ) : undefined}
    </div>
  );
};

export default Comments;
