import React from "react";
import styles from "../Post.module.css";
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
import { getUniqueGeneratedIdComment } from "../../../../core/methods/methods";

const FooterPost = (props) => {
  let onSubmit = (formData) => {
    console.log(formData);
    props.addComment({ id: getUniqueGeneratedIdComment({ id: props.account.id }), idAccount: props.account.id, postId: props.post.id, comment: formData[`comment_${props.post.id}`], dateAdded: new Date() });
  };

  let checkClickBookmarkIcon = props.account && props.account.profile && props.account.profile.savedPosts ? props.account.profile.savedPosts.find((postId) => (postId && props.post && props.post.id && postId === props.post.id ? postId : undefined)) : undefined;

  return (
    <div className={props.modal ? styles.footer : styles.footer_modal}>
      {props.modal ? <Comments post={props.post} modal={props.modal} history={props.history} kindOfPost={props.kindOfPost} currentAccount={props.currentAccount} accounts={props.accounts} account={props.account} /> : undefined}

      <div className={styles.footer_head}>
        <div className={styles.features}>
          <div className={styles.features_left}>
            <Checkbox onClick={() => (!props.checkClickFavoriteBorder ? props.putLike(props.post.id) : props.takeLike(props.post.id))} className={styles.icon} color="default" icon={!props.checkClickFavoriteBorder ? <FavoriteBorder /> : <Favorite sx={{ color: red[600] }} />} checkedIcon={props.checkClickFavoriteBorder ? <Favorite sx={{ color: red[600] }} /> : <FavoriteBorder />} />
            <Checkbox onClick={() => props.history.push(`${photoConstant}/${props.post.id}`)} className={styles.icon} color="default" size="medium" icon={<Comment />} checkedIcon={<Comment />} />
            <Checkbox className={styles.icon} color="default" size="medium" icon={<ShareOutlinedIcon />} checkedIcon={<ShareOutlinedIcon />} />
          </div>

          <div className={styles.features_right}>
            <Checkbox className={styles.icon} onClick={() => (!checkClickBookmarkIcon ? props.savePost(props.post.id) : props.deleteSavedPost(props.post.id))} color="default" size="medium" icon={!checkClickBookmarkIcon ? <BookmarkBorderIcon /> : <BookmarkIcon />} checkedIcon={checkClickBookmarkIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />} />
          </div>
        </div>
        <div className={styles.numberOfLikes}>
          {props.post && props.post.likes && props.post.likes.length ? props.post.likes.length : 0} <span>likes</span>
        </div>
      </div>

      {!props.modal ? <Comments post={props.post} modal={props.modal} history={props.history} kindOfPost={props.kindOfPost} currentAccount={props.currentAccount} accounts={props.accounts} account={props.account} /> : undefined}

      <FooterPostReduxForm onSubmit={onSubmit} post={props.post} />
    </div>
  );
};

export default FooterPost;
