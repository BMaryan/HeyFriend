import React from "react";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";
import { AccountType, FirebaseType, HistoryType, LikedOfPostType, LocationType } from "../../../types/types";
import { PostContainerPropsType } from "./PostContainer";
import FooterPost from "./FooterPost/FooterPost";
import BodyPost from "./BodyPost/BodyPost";
import HeadPost from "./HeadPost/HeadPost";
import styles from "./Post.module.scss";

interface PostPropsType extends PostContainerPropsType {
  id: string;
  history: HistoryType;
  location: LocationType;
}

const Post = (props: PostPropsType) => {
  const checkClickFavoriteBorder: LikedOfPostType | undefined = props?.post?.data()?.liked?.length !== 0 ? props?.post?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;
  const currentAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (props?.post?.data()?.accountId === account?.id ? account : undefined)) : undefined;

  // destructuring props
  const destPropsOfHeadPost = { account: props.account, currentAccount, post: props.post, history: props.history, modal: props.modal, updateAccountThunk: props.updateAccountThunk, deletePostThunk: props.deletePostThunk };
  const destPropsOfBodyPost = { account: props.account, post: props.post, location: props.location, kindOfPost: props.kindOfPost, checkClickFavoriteBorder, updatePostThunk: props.updatePostThunk };
  const destPropsOfFooterPost = { accounts: props.accounts, account: props.account, currentAccount, comments: props.comments, replies: props.replies, post: props.post, history: props.history, modal: props.modal, checkClickFavoriteBorder, createReplyThunk: props.createReplyThunk, updatePostThunk: props.updatePostThunk, createCommentThunk: props.createCommentThunk, updateCommentThunk: props.updateCommentThunk, updateReplyThunk: props.updateReplyThunk, deleteCommentThunk: props.deleteCommentThunk, deleteReplyThunk: props.deleteReplyThunk };

  return (
    <div className={styles.wrapper_post}>
      <div className={styles.post}>
        {props.kindOfPost === defaultPostConstant ? (
          <>
            <HeadPost {...destPropsOfHeadPost} />
            <BodyPost {...destPropsOfBodyPost} />

            <FooterPost {...destPropsOfFooterPost} />
          </>
        ) : props.kindOfPost === modalPostConstant ? (
          <div className={styles.toggle_show_post_content}>
            <div className={styles.postPhoto}>
              <BodyPost {...destPropsOfBodyPost} />
            </div>

            <div className={styles.content}>
              <HeadPost {...destPropsOfHeadPost} />
              <FooterPost {...destPropsOfFooterPost} />
            </div>
          </div>
        ) : props.kindOfPost === onlyBodyPostConstant ? (
          <>
            <BodyPost {...destPropsOfBodyPost} />
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default Post;
