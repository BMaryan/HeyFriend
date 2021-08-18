import React from "react";
import styles from "./Dialog.module.css";
import { NavLink } from "react-router-dom";

const Dialog = props => {
	return (
		<>
			<NavLink to={"/chat/" + props.user.id} className={styles.chat} activeClassName={styles.chat_active}>
				<div className={styles.wrapper_picture}>
					<div className={styles.hav_not_picture}>{props.user ? props.user.surname[0] + "" + props.user.name[0] : <></>}</div>
				</div>
				<div>
					<div className={styles.login}>{props.user ? props.user.surname + " " + props.user.name : <></>}</div>
					<div className={styles.message}>Hello, How are you</div>
				</div>
			</NavLink>
		</>
	);
};

export default Dialog;
