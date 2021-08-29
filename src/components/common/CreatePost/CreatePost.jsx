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

	let [postPicture, setPostPicture] = React.useState(null);

	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				setPostPicture(reader.result);
				// 	props.getProfileData({ posts: [{ img: reader.result }] });
				// 	localStorage.setItem("profile", JSON.stringify({ posts: [{ img: reader.result }] }));
			};
		}
	};

	console.log(props);

	return (
		<div className={styles.create_post}>
			<div className={styles.wrapper_body}>
				<div className={styles.wrapper_input}>
					<CreatePostReduxForm onSubmit={onSubmit} />
				</div>
				<div>
					<img className={styles.picture} src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
				</div>
			</div>
			<div className={styles.wrapper_content}>
				<div className={styles.wrapper_add_picture}>
					<label title='Choose photo' onChange={e => onChangeProfilePicture(e)}>
						{postPicture ? (
							<img className={styles.post_img} src={postPicture} alt='' />
						) : (
							<FontAwesomeIcon className={styles.icon} icon={faPlusSquare} />
						)}
						<input type='file' />
					</label>
				</div>
			</div>
			<div className={styles.wrapper_button_publish}>
				<button
					onClick={() =>
						postPicture ? (
							props.setProfilePosts(postPicture, null, null) &&
							props.setCreateNewPost(false) &&
							localStorage.setItem(
								"profile",
								JSON.stringify({
									...props.profile,
									posts: props.profile &&
										props.profile.posts && [
											...props.profile.posts,
											...props.profile.posts.filter((item, index) => props.profile.posts.indexOf(item) === index),
										],
									// : [...props.profile.posts],
								})
							)
						) : (
							<></>
						)
					}>
					Publish
				</button>
			</div>
		</div>
	);
};

export default CreatePost;
