import React from "react";
import styles from "./Post.module.css";
import HeadPost from "./HeadPost/HeadPost";
import BodyPost from "./BodyPost/BodyPost";
import FooterPost from "./FooterPost/FooterPost";
import { savePost } from "../../../redux/profile-reducer";

const Post = props => {
	return (
		<div className={styles.wrapper_post}>
			<div className={styles.post}>
				<HeadPost {...props} />
				<BodyPost {...props} />
				<FooterPost {...props} modal={false} />
			</div>
		</div>
	);
};

export default Post;
