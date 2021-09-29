import React from "react";
import styles from "../Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faPaperPlane, faBookmark } from "@fortawesome/free-solid-svg-icons";

const FooterPost = props => {
	return (
		<div className={styles.footer}>
			<div className={styles.features}>
				<div className={styles.features_left}>
					<FontAwesomeIcon className={styles.icon} icon={faHeart} />
					<FontAwesomeIcon className={styles.icon} icon={faComment} />
					<FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
				</div>
				<div className={styles.features_right}>
					<FontAwesomeIcon className={styles.icon} icon={faBookmark} />
				</div>
			</div>
			<div className={styles.numberOfComments}>
				{props.post && props.post.likes ? props.post.likes : 0} <span>likes</span>
			</div>
		</div>
	);
};

export default FooterPost;
