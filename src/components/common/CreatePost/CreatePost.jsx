import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faImages, faGrinBeam } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePost.module.css";
import defaultAvatar from "../../../assets/images/DefaultAvatar.png";
import CreatePostReduxForm from "./CreatePostForm";

const CreatePost = props => {
	let onSubmit = formData => {
		console.log(formData);
	};

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
					<CreatePostReduxForm onSubmit={onSubmit} />
				</div>
				<div>
					<img className={styles.picture} src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
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
