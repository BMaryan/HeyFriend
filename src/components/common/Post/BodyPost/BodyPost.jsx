import React from "react";
import styles from "../Post.module.scss";
import Button from "@mui/material/Button";

const BodyPost = (props) => {
  return (
    <div className={styles.body}>
      {props?.post?.postPhoto ? (
        <Button className={styles.button_image} variant="text">
          <div className={styles.bodyPhoto} title={!props.checkClickFavoriteBorder ? "Double-click if you liked the post" : "Double-click if you don't like the post"} onDoubleClick={() => (!props.checkClickFavoriteBorder ? props?.updatePostThunk({ ...props?.post, liked: props?.post?.liked ? [...props?.post?.liked, { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props?.post, liked: props?.post?.liked ? props?.post?.liked.filter((liked) => liked?.id !== props?.account?.id) : [] }))} style={{ backgroundImage: `url(${props?.post?.postPhoto})` }}></div>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BodyPost;
