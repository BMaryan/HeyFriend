import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Message = props => {
	console.log(props);

	return (
		<div
			className={
				(props.profileAuthorizationData &&
					props.id &&
					props.el.userId &&
					props.id !== props.el.userId &&
					props.profileAuthorizationData.id === props.el.userId &&
					props.id === props.profileAuthorizationData.id) ||
				(props.profileAuthorizationData &&
					props.id &&
					props.el.userId &&
					props.id === props.profileAuthorizationData.id &&
					props.id === props.el.userId) ||
				(props.profileAuthorizationData &&
					props.id &&
					props.el.userId &&
					props.id === props.profileAuthorizationData.id &&
					props.profileAuthorizationData.id === props.el.userId) ||
				(props.profileAuthorizationData &&
					props.id &&
					props.el.userId &&
					props.id !== props.profileAuthorizationData.id &&
					props.profileAuthorizationData.id === props.el.userId)
					? styles.wrapper_container_myMessage
					: styles.wrapper_container_otherMessage + " " + styles.wrapper_container_message
			}>
			<NavLink
				to={"/profile/" + props.id}
				className={
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id !== props.el.userId &&
						props.profileAuthorizationData.id === props.el.userId &&
						props.id === props.profileAuthorizationData.id) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id === props.profileAuthorizationData.id &&
						props.id === props.el.userId) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id === props.profileAuthorizationData.id &&
						props.profileAuthorizationData.id === props.el.userId) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id !== props.profileAuthorizationData.id &&
						props.profileAuthorizationData.id === props.el.userId)
						? styles.wrapper_myPicture
						: styles.wrapper_otherPicture + " " + styles.wrapper_picture
				}>
				<img src={defaultAvatar} alt='' />
			</NavLink>
			<div
				className={
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id !== props.el.userId &&
						props.profileAuthorizationData.id === props.el.userId &&
						props.id === props.profileAuthorizationData.id) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id === props.profileAuthorizationData.id &&
						props.id === props.el.userId) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id === props.profileAuthorizationData.id &&
						props.profileAuthorizationData.id === props.el.userId) ||
					(props.profileAuthorizationData &&
						props.id &&
						props.el.userId &&
						props.id !== props.profileAuthorizationData.id &&
						props.profileAuthorizationData.id === props.el.userId)
						? styles.wrapper_myMessage
						: styles.wrapper_otherMessage + " " + styles.wrapper_message
				}>
				{props.el && props.el.message}
			</div>
		</div>
	);
};

export default Message;
