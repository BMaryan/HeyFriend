import React from "react";
import Stories from "../common/Stories/Stories";
import CreatePost from "../common/CreatePost/CreatePost";
import styles from "./Main.module.css";

const Main = props => {
	return (
		<div className={styles.main}>
			<div className={styles.main_sideBar_left}>Side bar left</div>
			<div className={styles.main_content}>
				<CreatePost />
				<Stories profileAuthorizationData={props.profileAuthorizationData} />
			</div>
			<div className={styles.main_sideBar_right}>Side bar right</div>
		</div>
	);
};

export default Main;
