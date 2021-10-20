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
import { withBottomNavigation } from "../../hoc/withBottomNavigation/withBottomNavigation";

const Main = props => {
	return (
		<div className={styles.main}>
			{/* content */}
			<div className={styles.main_content}>
				{props.accounts &&
					props.accounts.map(accountProfiles => {
						if (props.account && props.account.profile && props.account.profile.following) {
							return props.account.profile.following.map(user => {
								if (accountProfiles.id === user.id) {
									return accountProfiles.profile.posts.map(post => {
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
						}
					})}
			</div>

			{/* sideBar right */}
			<div className={styles.main_sideBar_right}>
				<div className={styles.sideBar_right_content}>
					<>
						<ListItem className={styles.wrapper_item}>
							<ListItemAvatar>
								<Avatar
									src={
										props.account && props.account.profile && props.account.profile.avatar
											? props.account.profile.avatar
											: defaultAvatar
									}
									alt=''
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									props.account && props.account.profile
										? props.account.profile.surname + " " + props.account.profile.name
										: undefined
								}
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
									account.id !== props.account.id ? (
										<>
											<ListItem className={styles.wrapper_item}>
												<ListItemAvatar>
													<Avatar
														src={
															account && account.profile && account.profile.avatar
																? account.profile.avatar
																: defaultAvatar
														}
														alt=''
													/>
												</ListItemAvatar>
												<ListItemText
													primary={
														account && account.profile ? account.profile.surname + " " + account.profile.name : undefined
													}
													secondary={
														<React.Fragment>
															Followed by {account.profile.surname + " " + account.profile.name}
														</React.Fragment>
													}
												/>
											</ListItem>
										</>
									) : undefined
								)
								.slice(-5)
						: undefined}
				</div>
			</div>
		</div>
	);
};

export default withBottomNavigation(Main);
