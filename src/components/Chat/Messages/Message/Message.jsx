import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Message = props => {
	// console.log(props.el);

	return (
		<div className={styles.wrapper_container_message + " " + styles.wrapper_container_otherMessage}>
			{/* className={styles.wrapper_container_message + " " + styles.wrapper_container_myMessage + " " + styles.wrapper_container_otherMessage}> */}
			<NavLink
				to={"/profile/" + props.id}
				// className={styles.wrapper_picture + " " + styles.wrapper_myPicture + " " + styles.wrapper_otherPicture}
				className={styles.wrapper_picture + " " + styles.wrapper_otherPicture}>
				<img src={defaultAvatar} alt='' />
			</NavLink>
			<div
				// className={styles.wrapper_message + " " + styles.wrapper_myMessage + " " + styles.wrapper_otherPicture}
				className={styles.wrapper_message + " " + styles.wrapper_otherMessage}>
				<div>{props.el.message}</div>
			</div>
		</div>
	);
};

export default Message;
