import React from "react";
import styles from "./Post.module.scss";
import HeadPost from "./HeadPost/HeadPost";
import BodyPost from "./BodyPost/BodyPost";
import FooterPost from "./FooterPost/FooterPost";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";

const Post = (props) => {
  let checkClickFavoriteBorder = props?.account?.profile?.likedPosts && props?.account?.profile?.likedPosts?.length > 0 ? props?.account?.profile?.likedPosts?.find((like) => like.id === props.post.id) : undefined;
  let currentAccount = props?.accounts ? props?.accounts?.find((account) => (props?.post?.data()?.accountId === account?.id ? account : undefined)) : undefined;

  return (
    <div className={styles.wrapper_post}>
      <div className={styles.post}>
        {props.kindOfPost === defaultPostConstant ? (
          <>
            <HeadPost {...props} currentAccount={currentAccount?.data()} />
            <BodyPost {...props} checkClickFavoriteBorder={checkClickFavoriteBorder} currentAccount={currentAccount?.data()} />
            <FooterPost {...props} checkClickFavoriteBorder={checkClickFavoriteBorder} currentAccount={currentAccount?.data()} />
          </>
        ) : props.kindOfPost === modalPostConstant ? (
          <div className={styles.toggle_show_post_content}>
            <div className={styles.postPhoto}>
              <BodyPost {...props} checkClickFavoriteBorder={checkClickFavoriteBorder} currentAccount={currentAccount?.data()} />
            </div>

            <div className={styles.content}>
              <HeadPost {...props} currentAccount={currentAccount?.data()} />
              <FooterPost {...props} checkClickFavoriteBorder={checkClickFavoriteBorder} currentAccount={currentAccount?.data()} />
            </div>
          </div>
        ) : props.kindOfPost === onlyBodyPostConstant ? (
          <>
            <BodyPost {...props} checkClickFavoriteBorder={checkClickFavoriteBorder} currentAccount={currentAccount?.data()} />
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default Post;
