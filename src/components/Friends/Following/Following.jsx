import React from "react";
import styles from "./Following.module.css";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../core/constants/constants";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";

const Following = props => {
	return (
		<div className={styles.content}>
			<div className={styles.card}>
				{props.accounts &&
					props.accounts.map(profile =>
						profile && props.account && profile.id !== props.account.id ? (
							<NavLink className={styles.navLink} key={profile.id} to={`${profileConstant}/` + profile.id}>
								<div className={styles.wrapper_card}>
									<div className={styles.wrapper_avatar}>
										<img src={profile.profile && profile.profile.avatar ? profile.profile.avatar : defaultAvatar} alt='' />
									</div>
									<div className={styles.full_name}>{profile.profile.surname + " " + profile.profile.name}</div>
								</div>
							</NavLink>
						) : undefined
					)}
			</div>
		</div>
	);
};

export default Following;
