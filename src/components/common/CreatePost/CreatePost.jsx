import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faImages, faGrinBeam } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePost.module.css";

const CreatePost = post => {
	return (
		<div className={styles.create_post}>
			<div className={styles.wrapper_head}>
				<div>
					<FontAwesomeIcon className={styles.icon} icon={faPlusSquare} />
				</div>
				<div className={styles.title}>Create post</div>
			</div>
			<div className={styles.wrapper_body}>
				<div className={styles.wrapper_input}>
					<input className={styles.input} placeholder="What's on your mind?" />
				</div>
				<div>
					<img
						className={styles.picture}
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJuLvSlNlo9BFbzHAidNdUQi-yNeo97wWAw&usqp=CAU'
						alt=''
					/>
				</div>
			</div>
			<div className={styles.wrapper_footer}>
				<div className={styles.wrapper_feature}>
					<div>
						<FontAwesomeIcon className={styles.icon + " " + styles.icon__blue} icon={faImages} />
					</div>
					<div>Gallery</div>
				</div>
				<div className={styles.wrapper_feature}>
					<div>
						<FontAwesomeIcon className={styles.icon + " " + styles.icon__pink} icon={faPlusSquare} />
					</div>
					<div>Tag Friends</div>
				</div>
				<div className={styles.wrapper_feature}>
					<div>
						<FontAwesomeIcon className={styles.icon + " " + styles.icon__yellow} icon={faGrinBeam} />
					</div>
					<div>Feeling/Activity</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;
