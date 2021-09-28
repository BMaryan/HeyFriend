import React from "react";
import styles from "./Main.module.css";
import Post from "../common/Post/Post";

const Main = props => {
	return (
		<div className={styles.main}>
			{/* sideBar left */}
			<div className={styles.main_sideBar_left}>Side bar left</div>

			{/* content */}
			<div className={styles.main_content}>
				{props.accounts &&
					props.accounts.map(accountProfiles => {
						if (props.account && props.account.profile && props.account.profile.following) {
							return props.account.profile.following.map(user => {
								if (accountProfiles.id === user.id) {
									console.log(accountProfiles);
									console.log(user);
									return (
										<Post
											key={accountProfiles.id}
											post={accountProfiles.profile.posts[0]}
											accounts={props.accounts}
											account={accountProfiles}
										/>
									);
								}
							});
						}
					})}
			</div>

			{/* sideBar right */}
			<div className={styles.main_sideBar_right}>Side bar right</div>
		</div>
	);
};

export default Main;
