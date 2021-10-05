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
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../core/constants/constants";

const FooterPost = props => {
	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckMyProfile = props.account && props.account.profile && !props.id;
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	return (
		<div className={styles.footer}>
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
						<Checkbox className={styles.icon} color='default' size='medium' icon={<Comment />} checkedIcon={<Comment />} />
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
							color='default'
							size='medium'
							icon={<BookmarkBorderIcon />}
							checkedIcon={<BookmarkIcon />}
						/>
					</div>
				</div>
				<div className={styles.numberOfLikes}>
					{props.post && props.post.likes ? props.post.likes : 0} <span>likes</span>
				</div>
			</div>

			{props.post && props.post.ownerCommentToPost ? (
				<div className={styles.commentOwnerOfPost}>
					<NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.account.id}`}>
						{oftenCheckMyProfile
							? props.account.profile.surname + " " + props.account.profile.name
							: oftenCheckOtherProfile
							? otherProfile.profile.surname + " " + otherProfile.profile.name
							: undefined}
					</NavLink>
					{props.post.ownerCommentToPost}
				</div>
			) : undefined}

			<Comments />
		</div>
	);
};

export default FooterPost;
