import React from "react";
import styles from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { friendsConstant } from "../../core/constants/constants";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";
import Recommendation from "./Recommendation/Recommendation";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";

const Friends = props => {
	const [value, setValue] = React.useState(0);

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

					<Paper className={styles.navigation_bottom} sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }} elevation={3}>
						<BottomNavigation
							showLabels
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}>
							<BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
							<BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
							<BottomNavigationAction label='Archive' icon={<ArchiveIcon />} />
						</BottomNavigation>
					</Paper>
				</div>
			</div>
		</div>
	);
};

export default Friends;
