import React from "react";
import styles from "./Friends.module.css";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { profileConstant } from "../../core/constants/constants";

const Friends = props => {
	return (
		<div className={styles.friends}>
			<div className={styles.wrapper_friends}>
				<div className={styles.menu}>
					<div className={styles.title}>Friends</div>

					<div className={styles.wrapper_menu}>
						<div className={styles.item}>Main</div>
						<div className={styles.item}></div>
						<div className={styles.item}></div>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.card}>
						{props.accounts.map(profile =>
							profile.id !== props.account.id ? (
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
			</div>
		</div>
	);
};

export default Friends;
