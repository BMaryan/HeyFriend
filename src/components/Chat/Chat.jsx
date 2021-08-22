import React from "react";
import styles from "./Chat.module.css";
import dialogStyles from "./Dialogs/Dialog/Dialog.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Head = props => {
	let id = Number(props.match.params.id);

	return props.toggleShowContent ? (
		<div className={styles.head}>
			<div>Head</div>
		</div>
	) : (
		<div className={styles.head + " " + styles.head_messages}>
			<div>
				{props.users.map(user => {
					if (user && id && user.id === id) {
						return (
							<NavLink key={user.id} to={"/profile/" + user.id} className={dialogStyles.chat_forHead}>
								<div className={dialogStyles.wrapper_picture}>
									<div className={dialogStyles.have_not_picture_forHead}>{user ? user.surname[0] + "" + user.name[0] : <></>}</div>
								</div>
								<div>
									<div className={dialogStyles.login}>{user ? user.surname + " " + user.name : <></>}</div>
								</div>
							</NavLink>
						);
					}
				})}
			</div>
			<div>
				<FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
			</div>
		</div>
	);
};

const Chat = props => {
	let id = Number(props.match.params.id);

	return (
		<div className={styles.chat}>
			<div className={styles.dialogs}>
				<Head {...props} toggleShowContent={true} />
				<div className={styles.dialogs_content}>
					<Dialogs users={props.users} profileAuthorizationData={props.profileAuthorizationData} />
				</div>
			</div>
			<div className={styles.messages}>
				{id ? <Head {...props} toggleShowContent={false} /> : <></>}
				<div className={styles.messages_content}>
					<Messages profileAuthorizationData={props.profileAuthorizationData} match={props.match} />
				</div>
			</div>
			<div className={styles.details}></div>
		</div>
	);
};

export default Chat;
