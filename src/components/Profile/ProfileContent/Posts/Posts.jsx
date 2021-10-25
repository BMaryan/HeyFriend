import React from "react";
import styles from "./Posts.module.css";
import { ReturnImageList, ToggleShowCurrentPostContainer } from "../../../../utils/helperForProfile/helperForProfile";
import { useHistory, useParams } from "react-router-dom";

const Posts = props => {
	let history = useHistory();
	let params = useParams();

	let currentAccount =
		props.accounts &&
		props.accounts.find(account => {
			if (account && account.profile && account.profile.posts) {
				return account.profile.posts.find(post => (post && props.params.id ? post.id === props.params.id : undefined));
			} else {
				return props.account;
			}
		});

	let currentPost =
		currentAccount && currentAccount.profile && currentAccount.profile.posts
			? currentAccount.profile.posts.find(post => (post && props.params.id ? post.id === props.params.id : undefined))
			: props.account && props.account.profile && props.account.profile.posts
			? props.account.profile.posts.find(post => (post && props.params.id ? post.id === props.params.id : undefined))
			: undefined;

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{!props.id ? (
					<div className={styles.wrapper_input}>
						<input
							className={styles.input}
							onClick={() => props.handleOpen()}
							type='text'
							value=''
							onChange={() => undefined}
							placeholder="What's on your mind?"
						/>
					</div>
				) : undefined}

				<ReturnImageList
					accounts={props.accounts}
					account={props.account}
					openModalCurrentPost={props.openModalCurrentPost}
					setOpenModalCurrentPost={props.setOpenModalCurrentPost}
					otherProfile={otherProfile}
					oftenCheckOtherProfile={props.oftenCheckOtherProfile}
					id={props.id}
					logicOfPagePost={true}
				/>

				{props.openModalCurrentPost ? (
					<ToggleShowCurrentPostContainer
						{...props}
						openModalCurrentPost={props.openModalCurrentPost}
						setOpenModalCurrentPost={props.setOpenModalCurrentPost}
						otherProfile={otherProfile}
						id={props.id}
						history={history}
						params={params}
						currentAccount={currentAccount}
						currentPost={currentPost}
					/>
				) : undefined}
			</div>
		</div>
	);
};

export default Posts;
