import React from "react";
import styles from "./About.module.css";

const About = props => {
	return (
		<div className={styles.aboutMe}>
			{props.oftenCheckOtherProfile && props.otherProfile.profile.aboutMe ? (
				<div>{props.otherProfile.profile.aboutMe}</div>
			) : props.account && props.account.profile && props.account.profile.aboutMe ? (
				<div>{props.account.profile.aboutMe}</div>
			) : undefined}
		</div>
	);
};

export default About;
