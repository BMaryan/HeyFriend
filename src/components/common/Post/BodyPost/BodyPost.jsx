import React from "react";
import styles from "../Post.module.css";

const BodyPost = props => {
	return <div className={styles.body}>{props.post && props.post.avatar ? <img src={props.post.avatar} alt='' /> : <></>}</div>;
};

export default BodyPost;
