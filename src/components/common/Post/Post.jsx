import React from "react";
import styles from "./Post.module.css";
import HeadPost from "./HeadPost/HeadPost";
import BodyPost from "./BodyPost/BodyPost";
import FooterPost from "./FooterPost/FooterPost";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";

const Post = props => {
	return (
		<div className={styles.wrapper_post}>
			<div className={styles.post}>
				{props.kindOfPost === defaultPostConstant ? (
					<>
						<HeadPost {...props} />
						<BodyPost {...props} />
						<FooterPost {...props} />
					</>
				) : props.kindOfPost === modalPostConstant ? (
					<div className={styles.toggle_show_post_content}>
						<div className={styles.postPhoto}>
							<BodyPost {...props} />
						</div>

						<div className={styles.content}>
							<HeadPost {...props} />
							<FooterPost {...props} />
						</div>
					</div>
				) : props.kindOfPost === onlyBodyPostConstant ? (
					<>
						<BodyPost {...props} />
					</>
				) : undefined}
			</div>
		</div>
	);
};

export default Post;
