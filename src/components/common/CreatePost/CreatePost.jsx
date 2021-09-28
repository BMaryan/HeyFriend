import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreatePost.module.css";
import { CreateNewPostContainer } from "../../../utils/helperForProfile/helperForProfile";

const CreatePost = props => {
	let [createPostContainer, setCreatePostContainer] = React.useState(false);
	let [postPicture, setPostPicture] = React.useState(null);

	let onChangeProfilePicture = e => {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = function () {
				setPostPicture(reader.result);
			};
		}
	};

	return (
		<div className={styles.create_post}>
			<div className={styles.wrapper_body}>
				<div className={styles.wrapper_input}>
					<input
						onChange={() => undefined}
						onClick={() => (props.otherProfile ? setCreatePostContainer(false) : setCreatePostContainer(true))}
						className={styles.input}
						type='text'
						value=''
						placeholder="What's on your mind?"
					/>
					{/* <div className={styles.features}>
						<div className={styles.features_picture}>
							<label title='Add photo' onChange={e => onChangeProfilePicture(e)}>
								{postPicture && !createPostContainer ? (
									<CreateNewPostContainer
										setProfilePosts={props.setProfilePosts}
										onChangeProfilePicture={onChangeProfilePicture}
										postPicture={postPicture}
										setPostPicture={setPostPicture}
										setCreatePostContainer={setCreatePostContainer}
									/>
								) : undefined}
								<FontAwesomeIcon className={styles.icon} icon={faImage} />

								<input type='file' />
							</label>
						</div>
					</div> */}
				</div>
			</div>

			{createPostContainer ? (
				<CreateNewPostContainer
					account={props.account}
					otherProfile={props.otherProfile}
					setProfilePosts={props.setProfilePosts}
					onChangeProfilePicture={onChangeProfilePicture}
					postPicture={postPicture}
					setPostPicture={setPostPicture}
					setCreatePostContainer={setCreatePostContainer}
				/>
			) : undefined}
		</div>
	);
};

export default CreatePost;
