import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dialogs.module.css";

const Dialogs = props => {
	return (
		<div className={styles.dialogs}>
			<div className={styles.title}>Chats</div>
			<div className={styles.wrapper_input}>
				<input type='search' placeholder='Search contact' />
				<FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
			</div>
			<div className={styles.chats}>
				<div className={styles.chat}>
					<div className={styles.wrapper_picture}>
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU' alt='' />
					</div>
					<div>
						<div className={styles.login}>Andriy Arbovych</div>
						<div className={styles.message}>Hello, How are you</div>
					</div>
				</div>

				<div className={styles.chat}>
					<div className={styles.wrapper_picture}>
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU' alt='' />
					</div>
					<div>
						<div className={styles.login}>Andriy Arbovych</div>
						<div className={styles.message}>Hello, How are you</div>
					</div>
				</div>

				<div className={styles.chat}>
					<div className={styles.wrapper_picture}>
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU' alt='' />
					</div>
					<div>
						<div className={styles.login}>Andriy Arbovych</div>
						<div className={styles.message}>Hello, How are you</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dialogs;
