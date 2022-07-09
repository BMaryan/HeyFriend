import React from "react";
import { AccountType, CommentType, FirebaseType, HistoryType, LikedOfPostType, PostType, SavedOfPostType } from "../../../../types/types";
import { photoConstant } from "../../../../core/constants/constants";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Comment from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AvatarGroup from "@mui/material/AvatarGroup";
import Favorite from "@mui/icons-material/Favorite";
import FooterPostReduxForm from "./FooterPostForm";
import Checkbox from "@mui/material/Checkbox";
import Comments from "../Comments/Comments";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import styles from "../Post.module.scss";

interface FooterPostPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
  currentAccount: FirebaseType<AccountType> | undefined;
  comments: Array<FirebaseType<CommentType>>;
  post: FirebaseType<PostType> | undefined;
  checkClickFavoriteBorder: LikedOfPostType | undefined;
  history: HistoryType;
  modal: boolean;
  updatePostThunk: any;
  deleteCommentThunk: any;
  updateCommentThunk: any;
  createCommentThunk: any;
}

export interface FooterPostFormDataType {
  comment: string;
}

const FooterPost = (props: FooterPostPropsType) => {
  const onSubmit = (formData: FooterPostFormDataType) => {
    props.createCommentThunk({
      accountId: props?.account?.id,
      postId: props?.post?.id,
      comment: formData.comment,
      dateCreated: new Date(),
    });
  };

  const checkClickBookmarkIcon: SavedOfPostType | undefined = props?.post?.data()?.saved ? props?.post?.data()?.saved?.find((saved: SavedOfPostType) => (saved?.id && props?.account?.id && saved?.id === props?.account?.id ? saved : undefined)) : undefined;

  return (
    <div className={props.modal ? styles.footer : styles.footer_modal}>
      {props.modal ? <Comments accounts={props.accounts} account={props.account} currentAccount={props.currentAccount} comments={props.comments} post={props.post} modal={props.modal} history={props.history} deleteCommentThunk={props.deleteCommentThunk} updateCommentThunk={props.updateCommentThunk} /> : undefined}

      <div className={styles.footer_head}>
        <div className={styles.features}>
          <div className={styles.features_left}>
            <Checkbox onClick={() => (!props.checkClickFavoriteBorder ? props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? [...(props?.post?.data()?.liked as Array<LikedOfPostType>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props?.post?.data(), liked: props?.post?.data()?.liked ? props?.post?.data()?.liked?.filter((liked: LikedOfPostType) => liked?.id !== props?.account?.id) : [] }))} className={styles.icon} color="default" icon={!props.checkClickFavoriteBorder ? <FavoriteBorder /> : <Favorite sx={{ color: red[600] }} />} checkedIcon={props.checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} /> : <FavoriteBorder />} />
            <Checkbox onClick={() => props.history.push(`${photoConstant.path}/${props?.post?.id}`)} className={styles.icon} color="default" size="medium" icon={<Comment />} checkedIcon={<Comment />} />
            <Checkbox className={styles.icon} color="default" size="medium" icon={<ShareOutlinedIcon />} checkedIcon={<ShareOutlinedIcon />} />
          </div>

          <div className={styles.features_right}>
            <Checkbox className={styles.icon} onClick={() => (!checkClickBookmarkIcon ? props?.updatePostThunk({ ...props?.post?.data(), saved: props?.post?.data()?.saved ? [...(props?.post?.data()?.saved as Array<SavedOfPostType>), { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props?.post?.data(), saved: props?.post?.data()?.saved ? props?.post?.data()?.saved?.filter((saved: SavedOfPostType) => saved?.id !== props?.account?.id) : [] }))} color="default" size="medium" icon={!checkClickBookmarkIcon ? <BookmarkBorderIcon /> : <BookmarkIcon />} checkedIcon={checkClickBookmarkIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />} />
          </div>
        </div>
        <div className={styles.numberOfLikes}>
          <AvatarGroup className={styles.likes_avatar_group} max={4}>
            {props?.accounts ? props?.accounts?.map((account: FirebaseType<AccountType>) => props?.post?.data()?.liked?.map((liked: LikedOfPostType) => (account.id === liked.id ? <Avatar alt={account?.data()?.surname + " " + account?.data()?.name} src={account?.data()?.avatar} /> : undefined))) : undefined}
          </AvatarGroup>
          <span>
            {!props?.post?.data()?.liked || props?.post?.data()?.liked?.length === 0 ? 0 : undefined} {(props?.post?.data()?.liked?.length as number) > 1 ? "likes" : "like"}
          </span>
        </div>
      </div>

      {!props.modal ? <Comments accounts={props.accounts} account={props.account} currentAccount={props.currentAccount} comments={props.comments} post={props.post} modal={props.modal} history={props.history} deleteCommentThunk={props.deleteCommentThunk} updateCommentThunk={props.updateCommentThunk} /> : undefined}

      <FooterPostReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default FooterPost;
