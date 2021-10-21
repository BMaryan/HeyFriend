import React from "react";
import styles from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { friendsConstant } from "../../core/constants/constants";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";
import Recommendation from "./Recommendation/Recommendation";

const Friends = props => {
	return (
		<div className={styles.friends}>
			<div className={styles.wrapper_friends}>
				<div className={styles.friends_menu}>
					<ul className={styles.menu}>
						<li className={styles.friends_item}>
							<NavLink exact to={`${friendsConstant}`} className={styles.item} activeClassName={styles.item_active}>
								Following
							</NavLink>
						</li>
						<li className={styles.friends_item}>
							<NavLink to={`${friendsConstant}/followers`} className={styles.item} activeClassName={styles.item_active}>
								Followers
							</NavLink>
						</li>
						<li className={styles.friends_item}>
							<NavLink to={`${friendsConstant}/recommendation`} className={styles.item} activeClassName={styles.item_active}>
								Recommendation
							</NavLink>
						</li>
					</ul>
				</div>

				<div className={styles.friends_content}>
					<Route exact path={`${friendsConstant}`} render={() => <Following {...props} />} />
					<Route exact path={`${friendsConstant}/followers`} render={() => <Followers {...props} />} />
					<Route exact path={`${friendsConstant}/recommendation`} render={() => <Recommendation {...props} />} />
				</div>
			</div>
		</div>
	);
};

export default Friends;
