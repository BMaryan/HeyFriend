import React from "react";
import styles from "./ProfileContent.module.css";
import Posts from "./Posts/Posts";
import CreatePost from "../../common/CreatePost/CreatePost";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faInfo, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Information from "./Information/Information";
import Saved from "./Saved/Saved";

const ProfileContent = props => {
	let otherProfile = props.accounts.find(profile => (profile && props.id ? profile.id === props.id : undefined));
	let oftenCheckOtherProfile = otherProfile && otherProfile.profile && props.id;

	return (
		<div className={styles.profile_content}>
			{/* side bar left */}
			<div className={styles.side_bar_left}></div>

			{/* content */}
			<div className={styles.content}>
				<div className={styles.navigation}>
					<NavLink exact to='/profile' className={styles.item} activeClassName={styles.item_active}>
						<FontAwesomeIcon className={styles.icon} icon={faBorderAll} />
						Posts
					</NavLink>
					<NavLink to='/profile/information' className={styles.item} activeClassName={styles.item_active}>
						<FontAwesomeIcon className={styles.icon} icon={faInfo} />
						Information
					</NavLink>
					<NavLink exact to='/profile/saved' className={styles.item} activeClassName={styles.item_active}>
						<FontAwesomeIcon className={styles.icon} icon={faBookmark} />
						Saved
					</NavLink>
				</div>

				<Route
					exact
					path='/profile'
					render={() => {
						return (
							<>
								<CreatePost
									account={props.account}
									otherProfile={otherProfile}
									accounts={props.accounts}
									setProfilePosts={props.setProfilePosts}
								/>
								<Posts accounts={props.accounts} id={props.id} account={props.account} />
							</>
						);
					}}
				/>
				<Route
					path='/profile/information'
					render={() => (
						<Information
							accounts={props.accounts}
							id={props.id}
							account={props.account}
							otherProfile={otherProfile}
							oftenCheckOtherProfile={oftenCheckOtherProfile}
						/>
					)}
				/>
				<Route exact path='/profile/saved' render={() => <Saved accounts={props.accounts} id={props.id} account={props.account} />} />
			</div>

			{/* side bar right */}
			<div className={styles.side_bar_right}></div>
		</div>
	);
};

export default ProfileContent;
