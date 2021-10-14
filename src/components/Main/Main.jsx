import React from "react";
import styles from "./Main.module.css";
import PostContainer from "../common/Post/PostContainer";
import { defaultPostConstant } from "../../core/constants/constantsPost";

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
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos beatae consequatur similique quia alias dolorum doloremque
					ullam ex ea aperiam.
				</div>
			</div>
		</div>
	);
};

export default Main;
