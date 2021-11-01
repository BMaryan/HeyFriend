import React from "react";
import styles from "./Main.module.css";
import PostContainer from "../common/Post/PostContainer";
import { defaultPostConstant } from "../../core/constants/constantsPost";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

const Main = props => {
	return (
		<div className={styles.main}>
			{/* content */}
			<div className={styles.main_content}>
				{props?.accounts.map(accountProfiles => {
					if (props?.account?.profile?.following?.length > 0) {
						return props?.account?.profile?.following.map(user => {
							if (accountProfiles?.id === user?.id) {
								return accountProfiles?.profile?.posts.map(post => {
									return (
										<PostContainer
											key={post.id}
											modal={false}
											post={post}
											kindOfPost={defaultPostConstant}
											currentAccount={accountProfiles}
										/>
									);
								});
							}
						});
					} else {
						if (accountProfiles && accountProfiles.id === 1) {
							return (
								<div className={styles.default_content}>
									<div className={styles.default_content__wrapper_icon}>
										<DynamicFeedIcon />
									</div>
									<div className={styles.default_content__title}>News Feed</div>
									<div className={styles.default_content__subtitle}>Here will be the posts of your friends that you follow</div>
								</div>
							);
						}
					}
				})}
			</div>

			{/* sideBar right */}
			<div className={styles.main_sideBar_right}>
				<div className={styles.sideBar_right_content}>
					<>
						<ListItem className={styles.wrapper_item}>
							<ListItemAvatar>
								<Avatar src={props?.account?.profile?.avatar ? props.account.profile.avatar : defaultAvatar} alt='' />
							</ListItemAvatar>
							<ListItemText
								primary={props?.account?.profile ? props.account.profile.surname + " " + props.account.profile.name : undefined}
								secondary={
									<React.Fragment>Followed by {props.account.profile.surname + " " + props.account.profile.name}</React.Fragment>
								}
							/>
						</ListItem>
						<Divider sx={{ margin: "10px 0" }}>
							<Chip label='Suggestions For You' variant='outlined' />
						</Divider>
					</>

					{props.accounts
						? props.accounts
								.map(account =>
									account && props.account && account.id !== props.account.id ? (
										<ListItem key={account.id} className={styles.wrapper_item}>
											<ListItemAvatar>
												<Avatar src={account?.profile?.avatar ? account.profile.avatar : defaultAvatar} alt='' />
											</ListItemAvatar>
											<ListItemText
												primary={account?.profile ? account.profile.surname + " " + account.profile.name : undefined}
												secondary={
													<React.Fragment>
														Followed by {account.profile.surname + " " + account.profile.name}
													</React.Fragment>
												}
											/>
										</ListItem>
									) : undefined
								)
								.slice(-5)
						: undefined}
				</div>
			</div>
		</div>
	);
};

export default Main;
