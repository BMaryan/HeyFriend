import React from "react";
import { AccountType, CommentType, FirebaseType, HistoryType, LikedOfPostType, LocationType, PostType } from "../../../types/types";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";
import FooterPost from "./FooterPost/FooterPost";
import BodyPost from "./BodyPost/BodyPost";
import HeadPost from "./HeadPost/HeadPost";
import styles from "./Post.module.scss";

interface PostPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  comments: Array<FirebaseType<CommentType>>;
  post: FirebaseType<PostType> | undefined;
  history: HistoryType;
  location: LocationType;
  kindOfPost: typeof defaultPostConstant | typeof modalPostConstant | typeof onlyBodyPostConstant;
  id: string;
  modal: boolean;
  deletePostThunk: any;
  updatePostThunk: any;
  deleteCommentThunk: any;
  updateCommentThunk: any;
  createCommentThunk: any;
}

const Post = (props: PostPropsType) => {
  const checkClickFavoriteBorder: LikedOfPostType | undefined = props?.post?.data()?.liked?.length !== 0 ? props?.post?.data()?.liked?.find((liked: LikedOfPostType) => liked?.id === props?.account?.id) : undefined;
  const currentAccount: FirebaseType<AccountType> | undefined = props?.accounts ? props?.accounts?.find((account: FirebaseType<AccountType>) => (props?.post?.data()?.accountId === account?.id ? account : undefined)) : undefined;

  return (
    <div className={styles.wrapper_post}>
      <div className={styles.post}>
        {props.kindOfPost === defaultPostConstant ? (
          <>
            <HeadPost account={props.account} currentAccount={currentAccount} post={props.post} history={props.history} modal={props.modal} deletePostThunk={props.deletePostThunk} />
            <BodyPost account={props.account} post={props.post} checkClickFavoriteBorder={checkClickFavoriteBorder} updatePostThunk={props.updatePostThunk} />

            <FooterPost accounts={props.accounts} account={props.account} currentAccount={currentAccount} comments={props.comments} post={props.post} history={props.history} modal={props.modal} checkClickFavoriteBorder={checkClickFavoriteBorder} updatePostThunk={props.updatePostThunk} createCommentThunk={props.createCommentThunk} deleteCommentThunk={props.deleteCommentThunk} updateCommentThunk={props.updateCommentThunk} />
          </>
        ) : props.kindOfPost === modalPostConstant ? (
          <div className={styles.toggle_show_post_content}>
            <div className={styles.postPhoto}>
              <BodyPost account={props.account} post={props.post} checkClickFavoriteBorder={checkClickFavoriteBorder} updatePostThunk={props.updatePostThunk} />
            </div>

            <div className={styles.content}>
              <HeadPost account={props.account} currentAccount={currentAccount} post={props.post} history={props.history} modal={props.modal} deletePostThunk={props.deletePostThunk} />
              <FooterPost accounts={props.accounts} account={props.account} currentAccount={currentAccount} comments={props.comments} post={props.post} history={props.history} modal={props.modal} checkClickFavoriteBorder={checkClickFavoriteBorder} updatePostThunk={props.updatePostThunk} createCommentThunk={props.createCommentThunk} deleteCommentThunk={props.deleteCommentThunk} updateCommentThunk={props.updateCommentThunk} />
            </div>
          </div>
        ) : props.kindOfPost === onlyBodyPostConstant ? (
          <>
            <BodyPost account={props.account} post={props.post} checkClickFavoriteBorder={checkClickFavoriteBorder} updatePostThunk={props.updatePostThunk} />
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default Post;
