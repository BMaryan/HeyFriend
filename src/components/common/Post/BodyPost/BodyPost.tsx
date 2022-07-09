import React from "react";
import { AccountType, FirebaseType, LikedOfPostType, PostType } from "../../../../types/types";
import Button from "@mui/material/Button";
import styles from "../Post.module.scss";

interface BodyPostPropsType {
  account: AccountType | null;
  post: FirebaseType<PostType> | undefined;
  checkClickFavoriteBorder: LikedOfPostType | undefined;
  updatePostThunk: any;
  // updatePostThunk: (post: PostType) => void;
}

const BodyPost = (props: BodyPostPropsType) => {
  return (
    <div className={styles.body}>
      {props?.post?.data()?.postPhoto ? (
        <Button className={styles.button_image} variant="text">
          <div className={styles.bodyPhoto} title={!props.checkClickFavoriteBorder ? "Double-click if you liked the post" : "Double-click if you don't like the post"} onDoubleClick={() => (!props.checkClickFavoriteBorder ? props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? [...(props.post.data().liked as Array<FirebaseType<PostType>>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? props?.post?.data()?.liked?.filter((liked: LikedOfPostType) => liked?.id !== props?.account?.id) : [] }))} style={{ backgroundImage: `url(${props?.post?.data()?.postPhoto})` }}></div>
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BodyPost;
