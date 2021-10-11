import React from "react";
import styles from "./CurrentPost.module.css";
import BodyPost from "../../common/Post/BodyPost/BodyPost";
import HeadPost from "../../common/Post/HeadPost/HeadPost";
import FooterPost from "../../common/Post/FooterPost/FooterPost";
import { useParams } from "react-router-dom";
import PostContainer from "../Post/PostContainer";
import { modalPostConstant } from "../../../core/constants/constantsPost";

const CurrentPost = props => {
	let params = useParams();

	let foundAccount = props.accounts
		? props.accounts.find(account => {
				if (account.profile && account.profile.posts) {
					return account.profile.posts.find(post => {
						if (params && post.id === params.id) {
							return post;
						}
					});
				}
		  })
		: undefined;

	let currentPost =
		foundAccount && foundAccount.profile.posts ? (
			foundAccount.profile.posts.find(post => {
				if (post.id === params.id) {
					return post;
				}
			})
		) : (
			<></>
		);

	return (
		<div className={styles.current_post}>
			<div className={styles.current_post_content}>
				<PostContainer modal={true} kindOfPost={modalPostConstant} post={currentPost} account={foundAccount} />
				{/* <div className={styles.wrapper_post_photo}> */}
				{/* <BodyPost {...props} /> */}
				{/* <BodyPost {...props} account={foundAccount} post={currentPost} /> */}
				{/* </div>
				<div className={styles.wrapper_content}>
					<HeadPost currentAccount={foundAccount} /> */}
				{/* <HeadPost {...props} account={foundAccount} post={currentPost} /> */}
				{/* <FooterPost {...props} /> */}
				{/* <FooterPost {...props} account={foundAccount} post={currentPost} modal={true} /> */}
				{/* </div> */}
			</div>
		</div>
	);
};

export default CurrentPost;
