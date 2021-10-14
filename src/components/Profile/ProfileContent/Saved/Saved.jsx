import React from "react";
import { ReturnImageList } from "../../../../utils/helperForProfile/helperForProfile";

const Saved = props => {
	// let currentPost = props.accounts
	// 	? props.accounts.find(account => {
	// 			if (account && account.profile && account.profile.posts) {
	// 				return account.profile.posts.map(post => {
	// 					if (props.account && props.account.profile && props.account.profile.savedPosts) {
	// 						return props.account.profile.savedPosts.map(savedPostID => {
	// 							if (post.id === savedPostID) {
	// 								console.log(post);
	// 							}
	// 						});
	// 					}
	// 				});
	// 			}
	// 	  })
	// 	: undefined;

	return (
		<ReturnImageList
			accounts={props.accounts}
			account={props.account}
			openModalCurrentPost={props.openModalCurrentPost}
			setOpenModalCurrentPost={props.setOpenModalCurrentPost}
			otherProfile={props.otherProfile}
			oftenCheckOtherProfile={props.oftenCheckOtherProfile}
			logicOfPagePost={false}
			id={props.id}
		/>
	);
};

export default Saved;
