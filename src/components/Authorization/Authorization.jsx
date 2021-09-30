import React from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import styles from "./Authorization.module.css";

let Authorization = props => {
	let [toggleShowSign, setToggleShowSign] = React.useState(false);

	return (
		<div className={styles.wrapper_authorization}>
			{toggleShowSign ? (
				<SignIn {...props} toggleShowSign={toggleShowSign} setToggleShowSign={setToggleShowSign} />
			) : (
				<SignUp {...props} toggleShowSign={toggleShowSign} setToggleShowSign={setToggleShowSign} />
			)}
		</div>
	);
};

export default Authorization;
