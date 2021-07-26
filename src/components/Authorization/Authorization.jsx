import React from "react";
import SignUp from "./SignUp/SignUp";

const Authorization = props => {
	// console.log(props);

	return (
		<>
			<SignUp {...props} a={props.a} />
		</>
	);
};

export default Authorization;
