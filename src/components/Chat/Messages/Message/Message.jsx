import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.css";

const Message = props => {
	return (
		<div className={styles.wrapper_container_message + " " + styles.wrapper_container_otherMessage}>
			{/* className={styles.wrapper_container_message + " " + styles.wrapper_container_myMessage + " " + styles.wrapper_container_otherMessage}> */}
			<NavLink
				to={"/profile/" + props.id}
				// className={styles.wrapper_picture + " " + styles.wrapper_myPicture + " " + styles.wrapper_otherPicture}
				className={styles.wrapper_picture + " " + styles.wrapper_otherPicture}>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAAwQyKxGO39mWtUYjD0s_uhMSmEi4wXyPg&usqp=CAU' alt='' />
			</NavLink>
			<div
				// className={styles.wrapper_message + " " + styles.wrapper_myMessage + " " + styles.wrapper_otherPicture}
				className={styles.wrapper_message + " " + styles.wrapper_otherMessage}>
				<div>Hello, How do you do?</div>
			</div>
		</div>
	);
};

export default Message;
