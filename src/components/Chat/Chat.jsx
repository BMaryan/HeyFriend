import React from "react";
import styles from "./Chat.module.css";
import Dialogs from "./Dialogs/Dialogs";
import Messages from "./Messages/Messages";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import ChatReduxForm from "./ChatForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Head } from "../../utils/helperForChat/helperForChat";

const DefaultViewMessages = props => {
	return (
		<div className={styles.default_view_messages}>
			<div className={styles.wrapper_icon}>
				<FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
			</div>
			<div className={styles.title}>Your Messages</div>
			<div className={styles.subtitle}>Send private photos and messages to a friend or group</div>
			<div className={styles.wrapper_button}>
				<button>Send Message</button>
			</div>
		</div>
	);
};

const Chat = props => {
	let [toggleDetails, setToggleDetails] = React.useState(true);
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
					{!id ? <DefaultViewMessages /> : <></>}
				</div>

				{/* toggle container which shows when onClick on button  */}
				{id ? (
					props.users.map(user => {
						if (user && id && user.id === id) {
							return (
								<div key={user.id} className={toggleDetails ? styles.details_hidden : styles.details_show}>
									<NavLink
										key={user.id}
										to={
											props.profileAuthorizationData && props.profileAuthorizationData.id !== id
												? "/profile/" + user.id
												: "/profile"
										}
										className={styles.contact_link}>
										<div className={styles.wrapper_picture}>
											{user ? (
												<img src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
											) : (
												<></>
											)}
										</div>
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
