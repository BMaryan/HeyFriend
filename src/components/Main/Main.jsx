import React from "react";
import Stories from "../common/Stories/Stories";
import styles from "./Main.module.css";

const Main = props => {
	return (
		<div className={styles.main}>
			{/* sideBar left */}
			<div className={styles.main_sideBar_left}>Side bar left</div>

			{/* content */}
			<div className={styles.main_content}>
				<Stories profile={props.profile} profiles={props.profiles} profileAuthorizationData={props.profileAuthorizationData} />
			</div>

			{/* sideBar right */}
			<div className={styles.main_sideBar_right}>Side bar right</div>
		</div>
	);
};

export default Main;
