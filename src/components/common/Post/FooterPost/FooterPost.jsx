import React from "react";
import styles from "../Post.module.scss";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comment from "@mui/icons-material/CommentOutlined";
import { red } from "@mui/material/colors";
import Comments from "../Comments/Comments";
import { photoConstant } from "../../../../core/constants/constants";
import FooterPostReduxForm from "./FooterPostForm";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const FooterPost = (props) => {
  let onSubmit = (formData) => {
    props.createCommentThunk({
      accountId: props?.account?.id,
      postId: props?.post?.id,
      comment: formData.comment,
      dateCreated: new Date(),
    });
    // props.addComment(props?.post?.id, formData.comment);
  };

  let checkClickBookmarkIcon = props?.post?.saved ? props?.post?.saved?.find((saved) => (saved?.id && props?.account?.id && saved?.id === props?.account?.id ? saved : undefined)) : undefined;

  return (
    <div className={props.modal ? styles.footer : styles.footer_modal}>
      {props.modal ? <Comments {...props} /> : undefined}

      <div className={styles.footer_head}>
        <div className={styles.features}>
          <div className={styles.features_left}>
            <Checkbox onClick={() => (!props.checkClickFavoriteBorder ? props?.updatePostThunk({ ...props.post, liked: props?.post?.liked ? [...props?.post?.liked, { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props.post, liked: props?.post?.liked ? props?.post?.liked.filter((liked) => liked?.id !== props?.account?.id) : [] }))} className={styles.icon} color="default" icon={!props.checkClickFavoriteBorder ? <FavoriteBorder /> : <Favorite sx={{ color: red[600] }} />} checkedIcon={props.checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} /> : <FavoriteBorder />} />
            <Checkbox onClick={() => props.history.push(`${photoConstant.path}/${props.post.id}`)} className={styles.icon} color="default" size="medium" icon={<Comment />} checkedIcon={<Comment />} />
            <Checkbox className={styles.icon} color="default" size="medium" icon={<ShareOutlinedIcon />} checkedIcon={<ShareOutlinedIcon />} />
          </div>

          <div className={styles.features_right}>
            <Checkbox className={styles.icon} onClick={() => (!checkClickBookmarkIcon ? props?.updatePostThunk({ ...props?.post, saved: props?.post?.saved ? [...props?.post?.saved, { id: props?.account?.id }] : [{ id: props?.account?.id }] }) : props?.updatePostThunk({ ...props?.post, saved: props?.post?.saved ? props?.post?.saved?.filter((saved) => saved?.id !== props?.account?.id) : [] }))} color="default" size="medium" icon={!checkClickBookmarkIcon ? <BookmarkBorderIcon /> : <BookmarkIcon />} checkedIcon={checkClickBookmarkIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />} />
          </div>
        </div>
        <div className={styles.numberOfLikes}>
          <AvatarGroup className={styles.likes_avatar_group} max={4}>
            {props?.accounts ? props?.accounts?.map((account) => props?.post?.liked?.map((liked) => (account.id === liked.id ? <Avatar alt={account?.data()?.surname + " " + account?.data()?.name} src={account?.data()?.avatar} /> : undefined))) : undefined}
          </AvatarGroup>
          <span>
            {!props?.post?.liked || props?.post?.liked?.length === 0 ? 0 : undefined} {props?.post?.liked?.length > 1 ? "likes" : "like"}
          </span>
        </div>
      </div>

      {!props.modal ? <Comments {...props} /> : undefined}

      <FooterPostReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default FooterPost;
