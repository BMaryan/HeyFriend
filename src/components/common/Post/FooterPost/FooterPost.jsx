import React from "react";
import styles from "../Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
import Comment from "@mui/icons-material/CommentOutlined";
import { red } from "@mui/material/colors";

const FooterPost = props => {
	return (
		<div className={styles.footer}>
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
					{/* <IconButton>
						<FontAwesomeIcon className={styles.icon} icon={faComment} />
					</IconButton> */}
					<IconButton>
						<FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
					</IconButton>
				</div>

				<div className={styles.features_right}>
					<Checkbox className={styles.icon} color='default' size='medium' icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
				</div>
			</div>
			<div className={styles.numberOfComments}>
				{props.post && props.post.likes ? props.post.likes : 0} <span>likes</span>
			</div>
		</div>
	);
};

export default FooterPost;
