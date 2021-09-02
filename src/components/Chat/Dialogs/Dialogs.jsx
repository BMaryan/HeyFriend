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
				{props.chats && props.chats.length > 0 ? (
					props.chats.map(chat => {
						return props.users.map(user => {
							if (chat.id === user.id) {
								return (
									<Dialog
										key={chat.id}
										chat={chat}
										user={user}
										profile={props.profile}
										profileAuthorizationData={props.profileAuthorizationData}
									/>
								);
							}
						});
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Dialogs;
