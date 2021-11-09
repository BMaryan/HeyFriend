import React from "react";
import styles from "./Main.module.css";
import PostContainer from "../common/Post/PostContainer";
import { defaultPostConstant } from "../../core/constants/constantsPost";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../core/constants/constants";
import AvatarGroup from "@mui/material/AvatarGroup";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const Main = props => {
	let followedAccounts = props.account.profile.following
		? props.account.profile.following.map(followingAccount =>
				props.accounts ? props.accounts.find(account => account.id === followingAccount.id) : undefined
		  )
		: undefined;

	let checkPosts = followedAccounts
		? followedAccounts.filter(account => (account.profile.posts ? account.profile.posts.map(post => post) : undefined))
		: undefined;

	let checkFollowing = followedAccounts
		? followedAccounts.filter(account => (account.profile.following ? account.profile.following.map(following => following) : undefined))
		: undefined;

	props.getDefaultAccount(null);

	console.log(checkPosts);

	return (
		<div className={styles.main}>
			{/* // content */}
			<div className={styles.main_content}>
				{followedAccounts && followedAccounts.length > 0
					? followedAccounts.map((account, index) =>
							account.profile.posts && account.profile.posts.length > 0 ? (
								account.profile.posts.map(post =>
									post ? (
										<PostContainer
											key={post.id}
											modal={false}
											post={post}
											kindOfPost={defaultPostConstant}
											currentAccount={account}
										/>
									) : undefined
								)
							) : checkPosts && checkPosts.length < 1 ? (
								<div key={account.id} className={styles.default_content}>
									<div className={styles.default_content__wrapper_icon}>{/* <DynamicFeedIcon /> */}</div>
									<div className={styles.default_content__title}>News Feed</div>
									<div className={styles.default_content__subtitle}>
										Get started by adding friends. You'll see their posts here.
									</div>
								</div>
							) : undefined
					  )
					: undefined}
			</div>

			{/* sideBar right */}
			<div className={styles.main_sideBar_right}>
				<div className={styles.sideBar_right_content}>
					<div className={styles.wrapper_contact}>
						<div className={styles.wrapper_contact_info}>
							<NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant}`}>
								<img
									className={styles.avatar + " " + styles.avatar__large}
									src={props?.account?.profile?.avatar ? props.account.profile.avatar : defaultAvatar}
									alt=''
								/>
							</NavLink>
							<div className={styles.wrapper_contact_info_detail}>
								<NavLink className={styles.fullName} to={`${profileConstant}`}>
									{props.account.profile.surname + " " + props.account.profile.name}
								</NavLink>
								<div className={styles.subtitle}>{props.account.profile.status}</div>
							</div>
						</div>

						<div className={styles.wrapper_contact_button}></div>
					</div>

					<Divider sx={{ margin: "10px 0" }}>
						<Chip label='Suggestions For You' variant='outlined' />
					</Divider>

					{followedAccounts
						? followedAccounts
								.map(account =>
									account.profile.following && account.profile.following.length > 0 ? (
										account.profile.following.map(followedAccount => (
											<div key={followedAccount.id} className={styles.wrapper_contact}>
												<div className={styles.wrapper_contact_info}>
													<NavLink
														className={styles.wrapper_contact_info_avatar}
														to={`${profileConstant}/${props.accounts[followedAccount.id - 1].id}`}>
														<img
															className={styles.avatar + " " + styles.avatar__medium}
															src={
																props.accounts[followedAccount.id - 1].profile.avatar
																	? props.accounts[followedAccount.id - 1].profile.avatar
																	: defaultAvatar
															}
															alt=''
														/>
													</NavLink>

													<div className={styles.wrapper_contact_info_detail}>
														<NavLink
															className={styles.fullName}
															to={`${profileConstant}/${props.accounts[followedAccount.id - 1].id}`}>
															{props.accounts[followedAccount.id - 1].profile.surname +
																" " +
																props.accounts[followedAccount.id - 1].profile.name}
														</NavLink>

														<AvatarGroup className={styles.avatar_group} max={3}>
															<span className={styles.subtitle}>Followed</span>
															<NavLink to={`${profileConstant}/${account.id}`}>
																<img
																	className={styles.avatar + " " + styles.avatar__small}
																	src={account.profile.avatar ? account.profile.avatar : defaultAvatar}
																	alt={account.profile.surname + " " + account.profile.name}
																	title={account.profile.surname + " " + account.profile.name}
																/>
															</NavLink>
														</AvatarGroup>
													</div>
												</div>
											</div>
										))
									) : checkFollowing && checkFollowing.length < 1 ? (
										<div key={account.id} className={styles.default_content}>
											<div className={styles.default_content__wrapper_icon}>
												<PeopleAltOutlinedIcon />
											</div>
											<div className={styles.default_content__title}>No suggestions found</div>
										</div>
									) : undefined
								)
								.slice(followedAccounts.length - 5)
						: undefined}
				</div>
			</div>
		</div>
	);
};

export default Main;

// {
// 	props.accounts
// 		? props.accounts
// 				.map(account =>
// 					account.profile.following
// 						? account.profile.following.map(followedAccounts =>
// 								props.account.profile.following.map(followedAccount =>
// 									followedAccounts.id === followedAccount.id ? (
{
	/* <div key={account.id} className={styles.wrapper_contact}>
	<div className={styles.wrapper_contact_info}>
		<NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant}/${account.id}`}>
			<img
				className={styles.avatar + " " + styles.avatar__medium}
				src={account?.profile?.avatar ? account.profile.avatar : defaultAvatar}
				alt=''
			/>
		</NavLink>

		<div className={styles.wrapper_contact_info_detail}>
			<NavLink className={styles.fullName} to={`${profileConstant}/${account.id}`}>
				{account.profile.surname + " " + account.profile.name}
			</NavLink>

			<AvatarGroup className={styles.avatar_group} max={3}>
				<span className={styles.subtitle}>Followed</span>
				<NavLink to={`${profileConstant}/${props.accounts[followedAccounts.id - 1].id}`}>
					<img
						className={styles.avatar + " " + styles.avatar__small}
						src={
							props.accounts[followedAccounts.id - 1].profile.avatar
								? props.accounts[followedAccounts.id - 1].profile.avatar
								: defaultAvatar
						}
						alt={
							props.accounts[followedAccounts.id - 1].profile.surname +
							" " +
							props.accounts[followedAccounts.id - 1].profile.name
						}
						title={
							props.accounts[followedAccounts.id - 1].profile.surname +
							" " +
							props.accounts[followedAccounts.id - 1].profile.name
						}
					/>
				</NavLink>
			</AvatarGroup>
		</div>
	</div>

	<div className={styles.wrapper_contact_button}>
		{account.id === followedAccount.id ? (
			<Button
				// onClick={() => props.unFollowing(account.id)}
				variant='contained'>
				Unfollow
			</Button>
		) : (
			<Button
				// onClick={() => {
				// 	props.following(account.id);
				// }}
				variant='text'>
				Follow
			</Button>
		)}
	</div>
</div> */
}
// 									) : undefined
// 								)
// 						  )
// 						: undefined
// 				)
// 				.slice(-props.accounts.length)
// 		: undefined;
// }

// {
// 	followedAccounts
// 		? followedAccounts.map(account =>
// 				account.profile.following
// 					? account.profile.following.map(followedAccount =>
// 							followedAccounts.id === followedAccount.id ? (
// 								<div key={account.id} className={styles.wrapper_contact}>
// 									<div className={styles.wrapper_contact_info}>
// 										<NavLink className={styles.wrapper_contact_info_avatar} to={`${profileConstant}/${account.id}`}>
// 											<img
// 												className={styles.avatar + " " + styles.avatar__medium}
// 												src={account?.profile?.avatar ? account.profile.avatar : defaultAvatar}
// 												alt=''
// 											/>
// 										</NavLink>
// 										<div className={styles.wrapper_contact_info_detail}>
// 											<NavLink className={styles.fullName} to={`${profileConstant}/${account.id}`}>
// 												{account.profile.surname + " " + account.profile.name}
// 											</NavLink>
// 											<AvatarGroup className={styles.avatar_group} max={3}>
// 												<span className={styles.subtitle}>Followed</span>
// 												<NavLink to={`${profileConstant}/${props.accounts[followedAccounts.id - 1].id}`}>
// 													<img
// 														className={styles.avatar + " " + styles.avatar__small}
// 														src={
// 															props.accounts[followedAccounts.id - 1].profile.avatar
// 																? props.accounts[followedAccounts.id - 1].profile.avatar
// 																: defaultAvatar
// 														}
// 														alt={
// 															props.accounts[followedAccounts.id - 1].profile.surname +
// 															" " +
// 															props.accounts[followedAccounts.id - 1].profile.name
// 														}
// 														title={
// 															props.accounts[followedAccounts.id - 1].profile.surname +
// 															" " +
// 															props.accounts[followedAccounts.id - 1].profile.name
// 														}
// 													/>
// 												</NavLink>
// 											</AvatarGroup>
// 										</div>
// 									</div>

// 									<div className={styles.wrapper_contact_button}>
// 										{account.id === followedAccount.id ? (
// 											<Button
// 												// onClick={() => props.unFollowing(account.id)}
// 												variant='contained'>
// 												Unfollow
// 											</Button>
// 										) : (
// 											<Button
// 												// onClick={() => {
// 												// 	props.following(account.id);
// 												// }}
// 												variant='text'>
// 												Follow
// 											</Button>
// 										)}
// 									</div>
// 								</div>
// 							) : undefined
// 					  )
// 					: undefined
// 		  )
// 		: undefined;
// }
