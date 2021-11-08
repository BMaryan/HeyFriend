import React from "react";
import styles from "./About.module.css";

const About = props => {
	return (
		<div>
			<div className={styles.wrapper_item}>
				<div className={styles.title}>About me</div>
				{props.oftenCheckOtherProfile && props.otherProfile.profile.aboutMe && props.id ? (
					<div>{props.otherProfile.profile.aboutMe}</div>
				) : props.account && props.account.profile && props.account.profile.aboutMe && !props.id ? (
					<div>{props.account.profile.aboutMe}</div>
				) : undefined}
			</div>

			<div className={styles.wrapper_item}>
				<div className={styles.title}>Status</div>
				{props.oftenCheckOtherProfile && props.otherProfile.profile.status && props.id ? (
					<div>{props.otherProfile.profile.status}</div>
				) : props.account && props.account.profile && props.account.profile.status && !props.id ? (
					<div>{props.account.profile.status}</div>
				) : undefined}
			</div>
		</div>
	);
};

export default About;
