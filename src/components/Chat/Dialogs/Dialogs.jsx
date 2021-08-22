import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.css";
import Dialog from "./Dialog/Dialog";

const Dialogs = props => {
	return (
		<div className={styles.dialogs}>
			{/* <div className={styles.title}>Chats</div> */}
			<div className={styles.wrapper_input}>
				<input type='search' placeholder='Search contact' />
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</div>
			<div className={styles.chats}>
				{props.users.map(user => (
					<Dialog key={user.id} user={user} profileAuthorizationData={props.profileAuthorizationData} />
				))}
			</div>
		</div>
	);
};

export default Dialogs;
