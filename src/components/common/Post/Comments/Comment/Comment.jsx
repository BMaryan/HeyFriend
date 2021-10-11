import React from "react";
import { NavLink } from "react-router-dom";
import { profileConstant } from "../../../../../core/constants/constants";
import styles from "./Comment.module.css";

const Comment = props => {
	return (
		<div className={styles.comment}>
			<div className={!props.modal ? styles.description : styles.description_modal}>
				<NavLink className={styles.full_name_comment} to={`${profileConstant}/${props.currentAccount.id}`}>
					{props.currentAccount ? props.currentAccount.profile.surname + " " + props.currentAccount.profile.name : undefined}
				</NavLink>
				{props.post.description ? props.post.description : undefined}
			</div>
		</div>
	);
};

export default Comment;
