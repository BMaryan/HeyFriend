import React from "react";
import styles from "./Stories.module.css";
import Story from "./Story/Story";

const Stories = props => {
	return (
		<div className={styles.stories}>
			<Story profile={props.profile} profiles={props.profiles} profileAuthorizationData={props.profileAuthorizationData} />
		</div>
	);
};

export default Stories;
