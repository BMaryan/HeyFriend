import React from "react";
import styles from "./DefaultFriends.module.css";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const DefaultFriends = props => {
	return (
		<div className={styles.default_friends}>
			<div className={styles.wrapper_icon}>
				<PeopleOutlineIcon className={styles.icon} />
			</div>
			<div className={styles.title}>Friends</div>
			<div className={styles.subtitle}>Choose what you want to show</div>
		</div>
	);
};

export default DefaultFriends;
