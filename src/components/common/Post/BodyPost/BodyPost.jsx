import React from "react";
import styles from "../Post.module.scss";
import Button from "@mui/material/Button";

const BodyPost = (props) => {
  // console.log(props);

  return (
    <div className={styles.body}>
      {props?.post?.postPhoto ? (
        <Button className={styles.button_image} variant="text">
          <div className={styles.bodyPhoto} title={!props.checkClickFavoriteBorder ? "Double-click if you liked the post" : "Double-click if you don't like the post"} onDoubleClick={() => (!props.checkClickFavoriteBorder ? props.putLike(props.post.id) : props.takeLike(props.post.id))} style={{ backgroundImage: `url(${props?.post?.postPhoto})` }}></div>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BodyPost;
