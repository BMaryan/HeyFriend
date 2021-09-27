import React from "react";
import styles from "./Stories.module.css";
import Story from "./Story/Story";

const Stories = props => {
	return (
		<div className={styles.stories}>
			<Story accounts={props.accounts} account={props.account} />
		</div>
	);
};

export default Stories;
