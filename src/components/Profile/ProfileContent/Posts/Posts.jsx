import React from "react";
import styles from "./Posts.module.css";
import PostContainer from "../../../common/Post/PostContainer";
import { onlyBodyPostConstant } from "../../../../core/constants/constantsPost";
import CreatePost from "../../../common/CreatePost/CreatePost";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { photoConstant, profileConstant } from "../../../../core/constants/constants";
import { NavLink } from "react-router-dom";
import { ToggleShowCurrentPostContainer } from "../../../../utils/helperForProfile/helperForProfile";
import { useHistory, useParams } from "react-router-dom";

const Posts = props => {
	let [openModalCurrentPost, setOpenModalCurrentPost] = React.useState(false);
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
			: props.account.profile.posts.find(post => (post && props.params.id ? post.id === props.params.id : undefined));

	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));

	return (
		<div className={styles.posts}>
			<div className={styles.wrapper_posts}>
				{!props.id ? (
					<CreatePost account={props.account} otherProfile={otherProfile} accounts={props.accounts} handleOpen={props.handleOpen} />
				) : undefined}
				<ImageList className={styles.posts}>
					{props.account && props.account.profile && props.account.profile.posts && !props.id
						? props.account.profile.posts.map(post => (
								<ImageListItem key={post.id} className={styles.wrapper_posts}>
									<NavLink
										exact
										key={post.id}
										onClick={() => (openModalCurrentPost ? setOpenModalCurrentPost(false) : setOpenModalCurrentPost(true))}
										to={`${profileConstant}${photoConstant}/${post.id}`}
										className={styles.post}>
										<PostContainer key={post.id} post={post} kindOfPost={onlyBodyPostConstant} />
									</NavLink>
								</ImageListItem>
						  ))
						: props.oftenCheckOtherProfile && otherProfile.profile.posts
						? otherProfile.profile.posts.map(post => (
								<ImageListItem key={post.id} className={styles.wrapper_posts}>
									<NavLink
										exact
										key={post.id}
										onClick={() => (openModalCurrentPost ? setOpenModalCurrentPost(false) : setOpenModalCurrentPost(true))}
										to={`${profileConstant}/${props.id}${photoConstant}/${post.id}`}
										className={styles.post}>
										<PostContainer key={post.id} post={post} kindOfPost={onlyBodyPostConstant} />
									</NavLink>
								</ImageListItem>
						  ))
						: undefined}
				</ImageList>

				{openModalCurrentPost ? (
					<ToggleShowCurrentPostContainer
						{...props}
						openModalCurrentPost={openModalCurrentPost}
						setOpenModalCurrentPost={setOpenModalCurrentPost}
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
