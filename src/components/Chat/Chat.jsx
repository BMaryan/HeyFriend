import React from "react";
import styles from "./Chat.module.css";
import dialogStyles from "./Dialogs/Dialog/Dialog.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import ChatReduxForm from "./ChatForm";

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
									<div className={dialogStyles.have_not_picture_forHead}>{user ? <img src={defaultAvatar} alt='' /> : <></>}</div>
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
				<FontAwesomeIcon
					onClick={() => (props.toggleDetails ? props.setToggleDetails(false) : props.setToggleDetails(true))}
					className={styles.icon}
					icon={faInfoCircle}
				/>
			</div>
		</div>
	);
};

const Chat = props => {
	let [toggleDetails, setToggleDetails] = React.useState(false);
	let id = Number(props.match.params.id);

	return (
		<div className={styles.chat}>
			<div className={styles.dialogs}>
				<Head {...props} toggleShowContent={true} />
				<div className={styles.dialogs_content}>
					<Dialogs users={props.users} profileAuthorizationData={props.profileAuthorizationData} />
				</div>
			</div>
			<div className={toggleDetails ? styles.messages_noDetails : styles.messages_details}>
				{id ? <Head {...props} toggleShowContent={false} toggleDetails={toggleDetails} setToggleDetails={setToggleDetails} /> : <></>}
				<div className={id ? styles.messages_content : styles.messages_content_defaultView}>
					<Messages profileAuthorizationData={props.profileAuthorizationData} match={props.match} />
					<ChatReduxForm />
				</div>
				{id ? (
					props.users.map(user => {
						if (user && id && user.id === id) {
							return (
								<div key={user.id} className={toggleDetails ? styles.details_hidden : styles.details_show}>
									<NavLink key={user.id} to={"/profile/" + user.id} className={styles.contact_link}>
										<div className={styles.wrapper_picture}>{user ? <img src={defaultAvatar} alt='' /> : <></>}</div>
										<div className={styles.fullName}>{user ? user.surname + " " + user.name : <></>}</div>
									</NavLink>
								</div>
							);
						}
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Chat;
