import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.css";
import Dialog from "./Dialog/Dialog";
import workInProgress from "../../../assets/images/workInProgress.png";

const Dialogs = props => {
	// let myProfile = props.accounts ? props.accounts.find(profile => (props.account ? profile.id === props.account.id : undefined)) : undefined;

	return (
		<div className={styles.dialogs}>
			<div className={styles.wrapper_input}>
				<input type='search' placeholder='Search contact' />
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</div>
			<div className={styles.chats}>
				{/* {myProfile && myProfile.profile && myProfile.profile.chats
					? myProfile.profile.chats.map(chat => <Dialog key={chat.id} users={props.users} chat={chat} account={props.account} />)
					: undefined} */}
				{props.chats && props.chats.length > 0 ? (
					props.chats.map(chat => <Dialog key={chat.id} chat={chat} account={props.account} />)
				) : (
					<div className={styles.chats_wrapper_text}>
						<img src={workInProgress} alt='' />
						{/* <div className={styles.chats_wrapper_title}>Work</div>
					<div className={styles.chats_wrapper_subtitle}>in progress</div> */}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dialogs;
