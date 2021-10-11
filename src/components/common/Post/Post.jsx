import React from "react";
import styles from "./Post.module.css";
import HeadPost from "./HeadPost/HeadPost";
import BodyPost from "./BodyPost/BodyPost";
import FooterPost from "./FooterPost/FooterPost";
import { defaultPostConstant, modalPostConstant, onlyBodyPostConstant } from "../../../core/constants/constantsPost";

const Post = props => {
	let currentAccount =
		props.accounts &&
		props.accounts.find(account =>
			account && account.profile && account.profile.posts
				? account.profile.posts.find(post => (post && props.post && post.id ? post.id === props.post.id : undefined))
				: props.account
		);

	return (
		<div className={styles.wrapper_post}>
			<div className={styles.post}>
				{props.kindOfPost === defaultPostConstant ? (
					<>
						<HeadPost {...props} currentAccount={currentAccount} />
						<BodyPost {...props} />
						<FooterPost {...props} currentAccount={currentAccount} />
					</>
				) : props.kindOfPost === modalPostConstant ? (
					<div className={styles.toggle_show_post_content}>
						<div className={styles.postPhoto}>
							<BodyPost {...props} />
						</div>

						<div className={styles.content}>
							<HeadPost {...props} currentAccount={currentAccount} />
							<FooterPost {...props} currentAccount={currentAccount} />
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
