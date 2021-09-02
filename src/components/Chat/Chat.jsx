import React from "react";
import styles from "./Chat.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import ChatReduxForm from "./ChatForm";
import { Head } from "../../utils/helperForChat/helperForChat";

const Chat = props => {
	let [toggleDetails, setToggleDetails] = React.useState(false);
	let id = Number(props.match.params.id);

	let onSubmit = formData => {
		props.addMessage(id, props.profileAuthorizationData.id, formData.send_message);
	};

	return (
		<div className={styles.chat}>
			<div className={styles.dialogs}>
				<Head {...props} toggleShowContent={true} />
				<div className={styles.dialogs_content}>
					<Dialogs
						users={props.users}
						profile={props.profile}
						chats={props.chats}
						profileAuthorizationData={props.profileAuthorizationData}
					/>
				</div>
			</div>

			<div className={toggleDetails ? styles.messages_noDetails : styles.messages_details}>
				{id ? <Head {...props} toggleShowContent={false} toggleDetails={toggleDetails} setToggleDetails={setToggleDetails} /> : <></>}

				<div className={id ? styles.messages_content : styles.messages_content_defaultView}>
					{props.chats && props.chats.length ? (
						props.chats.map(chat => {
							if (chat.id === id) {
								return (
									<Messages
										key={chat.id}
										chat={chat}
										profile={props.profile}
										profileAuthorizationData={props.profileAuthorizationData}
										match={props.match}
									/>
								);
							}
						})
					) : (
						<></>
					)}

					{id ? <ChatReduxForm onSubmit={onSubmit} /> : <></>}
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
