import React from "react";
import styles from "./Story.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Story = props => {
	// let foundMyProfile = props.profiles.find(profile =>
	// 	profile && props.profileAuthorizationData ? profile.id === props.profileAuthorizationData.id : undefined
	// );

	return (
		<div className={styles.story}>
			<div className={styles.wrapper_content}>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCd-m7iQF1pBft6SEEeMl7zQTJBPQCA8vSg&usqp=CAU' alt='' />
			</div>

			<div className={styles.wrapper_footer}>
				{/* <div className={styles.wrapper_picture}>
					<img className={styles.picture} src={foundMyProfile && foundMyProfile.profile &&  foundMyProfile.profile.img ? foundMyProfile.profile.img : defaultAvatar} alt='' />
				</div> */}
				{/* <div className={styles.fullName}>
					{foundMyProfile && foundMyProfile.profile ? foundMyProfile.profile.surname + " " + foundMyProfile.profile.name : <></>}
				</div> */}
				<div className={styles.fullName}>{props.profile ? props.profile.surname + " " + props.profile.name : <></>}</div>
			</div>
		</div>
	);
};

export default Story;
