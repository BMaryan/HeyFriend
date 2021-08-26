import React from "react";
import styles from "../Stories.module.css";
import defaultAvatar from "../../../../assets/images/DefaultAvatar.png";

const Story = props => {
	return (
		<div className={styles.wrapper_story}>
			<div className={styles.story}>
				<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCd-m7iQF1pBft6SEEeMl7zQTJBPQCA8vSg&usqp=CAU' alt='' />
			</div>
			<div className={styles.wrapper_footer}>
				{/* <div className={styles.wrapper_picture}>
					<img className={styles.picture} src={props.profile && props.profile.img ? props.profile.img : defaultAvatar} alt='' />
				</div> */}
				<div className={styles.login}>{props.profile ? props.profile.surname + " " + props.profile.name : <></>}</div>
			</div>
		</div>
	);
};

export default Story;
