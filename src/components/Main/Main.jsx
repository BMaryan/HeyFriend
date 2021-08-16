import React from "react";
import CreatePost from "../CreatePost/CreatePost";
import styles from "./Main.module.css";

const Main = props => {
	console.log(props);

	return (
		<div className={styles.main}>
			<div className={styles.main_sideBar_left}>Side bar left</div>
			<div className={styles.main_content}>
				<CreatePost />
			</div>
			<div className={styles.main_sideBar_right}>Side bar right</div>
		</div>
	);
};

export default Main;
