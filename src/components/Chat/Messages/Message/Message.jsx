import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Message.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Message = props => {
	let checkMessage =
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
			props.profileAuthorizationData.id === props.el.userId);

	let myProfile = props.profiles
		? props.profiles.find(profile => (props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined))
		: undefined;

	return (
		<div
			className={
				checkMessage ? styles.wrapper_container_myMessage : styles.wrapper_container_otherMessage + " " + styles.wrapper_container_message
			}>
			<NavLink
				to={props.profileAuthorizationData && props.profileAuthorizationData.id !== props.id ? "/profile/" + props.id : "/profile"}
				className={checkMessage ? styles.wrapper_myPicture : styles.wrapper_otherPicture + " " + styles.wrapper_picture}>
				<img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
			</NavLink>
			<div className={checkMessage ? styles.wrapper_myMessage : styles.wrapper_otherMessage + " " + styles.wrapper_message}>
				{props.el && props.el.message}
			</div>
		</div>
	);
};

export default Message;
