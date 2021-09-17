import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.css";
import Dialog from "./Dialog/Dialog";

const Dialogs = props => {
	let myProfile = props.profiles
		? props.profiles.find(profile => (props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined))
		: undefined;

	console.log(myProfile);

	return (
		<div className={styles.dialogs}>
			{/* <div className={styles.title}>Chats</div> */}
			<div className={styles.wrapper_input}>
				<input type='search' placeholder='Search contact' />
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</div>
			<div className={styles.chats}>
				{myProfile
					? myProfile.profile.chats.map(chat => (
							<Dialog
								key={chat.id}
								users={props.users}
								chat={chat}
								profile={props.profile}
								profileAuthorizationData={props.profileAuthorizationData}
							/>
					  ))
					: undefined}
			</div>
		</div>
	);
};

export default Dialogs;
