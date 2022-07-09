import React from "react";
import { modalPostConstant, defaultPostConstant } from "../../../core/constants/constantsPost";
import { AccountType, FirebaseType, PostType } from "../../../types/types";
import PostContainer from "../Post/PostContainer";
import styles from "./CurrentPost.module.scss";
import Media from "react-media";

interface CurrentPostPropsType {
  account: AccountType | null;
  posts: Array<FirebaseType<PostType>>;
  id: string;
}

const CurrentPost = (props: CurrentPostPropsType) => {
  const currentPost: FirebaseType<PostType> | undefined = props.posts.length !== 0 ? props.posts.find((post: FirebaseType<PostType>) => (post?.data()?.id === props?.id ? post : undefined)) : undefined;

  return (
    <div className={styles.current_post}>
      <div className={styles.current_post_content}>
        <Media query={{ maxWidth: 720 }}>{(matches) => (matches ? <PostContainer modal={false} kindOfPost={defaultPostConstant} post={currentPost} /> : <PostContainer modal={true} kindOfPost={modalPostConstant} post={currentPost} />)}</Media>
      </div>
    </div>
  );
};

export default CurrentPost;
