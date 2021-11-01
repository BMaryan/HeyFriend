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

const FooterPost = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

	let checkClickBookmarkIcon =
		props.account && props.account.profile && props.account.profile.savedPosts
			? props.account.profile.savedPosts.find(postId =>
					postId && props.post && props.post.id && postId === props.post.id ? postId : undefined
			  )
			: undefined;

	return (
		<div className={props.modal ? styles.footer : styles.footer_modal}>
			{props.modal ? <Comments post={props.post} modal={props.modal} currentAccount={props.currentAccount} /> : undefined}

			<div className={styles.footer_head}>
				<div className={styles.features}>
					<div className={styles.features_left}>
						<Checkbox
							className={styles.icon}
							sx={{
								color: red[0],
								"&.Mui-checked": {
									color: red[600],
								},
							}}
							icon={<FavoriteBorder />}
							checkedIcon={<Favorite />}
						/>
						<Checkbox
							onClick={() => props.history.push(`${photoConstant}/${props.post.id}`)}
							className={styles.icon}
							color='default'
							size='medium'
							icon={<Comment />}
							checkedIcon={<Comment />}
						/>
						<Checkbox
							className={styles.icon}
							color='default'
							size='medium'
							icon={<ShareOutlinedIcon />}
							checkedIcon={<ShareOutlinedIcon />}
						/>
					</div>

					<div className={styles.features_right}>
						<Checkbox
							className={styles.icon}
							onClick={() => (!checkClickBookmarkIcon ? props.savePost(props.post.id) : props.deleteSavedPost(props.post.id))}
							color='default'
							size='medium'
							icon={!checkClickBookmarkIcon ? <BookmarkBorderIcon /> : <BookmarkIcon />}
							checkedIcon={checkClickBookmarkIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />}
						/>
					</div>
				</div>
				<div className={styles.numberOfLikes}>
					{props.post && props.post.likes && props.post.likes.length ? props.post.likes.length : 0} <span>likes</span>
				</div>
			</div>

			{!props.modal ? <Comments post={props.post} modal={props.modal} currentAccount={props.currentAccount} /> : undefined}

			<FooterPostReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default FooterPost;
