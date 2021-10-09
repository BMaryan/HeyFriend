import React from "react";
import styles from "./Contacts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacts = props => {
	let valuePhoneOrEmail =
		props.account && !props.id
			? props.account.profile.phone_or_email
			: props.otherProfile
			? props.otherProfile.profile.phone_or_email
			: undefined;

	return (
		<div className={styles.contacts}>
			{props.account && props.account.profile && props.account.profile.phone_or_email ? (
				props.account.profile.phone_or_email.includes("@") ? (
					<ReturnEmail value={valuePhoneOrEmail} />
				) : (
					<ReturnPhone value={valuePhoneOrEmail} />
				)
			) : undefined}
		</div>
	);
};

let ReturnEmail = props => {
	return (
		<div className={styles.wrapper_item}>
			<div className={styles.title}>Email</div>
			<div className={styles.wrapper_content}>
				<div>
					<FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
				</div>
				<div className={styles.value}>{props.value}</div>
			</div>
		</div>
	);
};

let ReturnPhone = props => {
	return (
		<div className={styles.wrapper_item}>
			<div className={styles.title}>Phone number</div>
			<div className={styles.wrapper_content}>
				<div>
					<FontAwesomeIcon className={styles.icon} icon={faPhoneAlt} />
				</div>
				<div className={styles.value}>{props.value}</div>
			</div>
		</div>
	);
};

export default Contacts;
