import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import dialogStyles from "../../components/Chat/Dialogs/Dialog/Dialog.module.css";
import styles from "./helperForChat.module.css";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";

export const Head = props => {
	let id = Number(props.match.params.id);

	return props.toggleShowContent ? (
		<div className={styles.head}>
			<div>Find Friends</div>
		</div>
	) : (
		<div className={styles.head + " " + styles.head_messages}>
			<div>
				{props.users.map(user => {
					if (user && id && user.id === id) {
						return (
							<NavLink
								key={user.id}
								to={props.profileAuthorizationData && props.profileAuthorizationData.id !== id ? "/profile/" + user.id : "/profile"}
								className={dialogStyles.chat_forHead}>
								<div className={dialogStyles.wrapper_picture}>
									<div className={dialogStyles.have_not_picture_forHead}>
										{user ? <img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' /> : <></>}
									</div>
								</div>
								<div>
									<div className={dialogStyles.login}>{user ? user.surname + " " + user.name : <></>}</div>
								</div>
							</NavLink>
						);
					}
				})}
			</div>
			<div>
				<FontAwesomeIcon
					onClick={() => (props.toggleDetails ? props.setToggleDetails(false) : props.setToggleDetails(true))}
					className={styles.icon}
					icon={faInfoCircle}
				/>
			</div>
		</div>
	);
};
