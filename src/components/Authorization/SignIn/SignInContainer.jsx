/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthorization, setUsers, setUserSignIn } from "../../../redux/auth-reducer";
import { setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";

const SignInContainer = props => {
	// console.log("SIGN IN CONTAINER", props);

	setSignUpDataToLocalStorage(props);

	useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		props.setUsers(users);
	}, []);

	return (
		<SignIn
			{...props}
			profileAuthorizationData={props.profileAuthorizationData}
			checkAuthorization={props.checkAuthorization}
			setUserSignIn={props.setUserSignIn}
			userSignIn={props.userSignIn}
		/>
	);
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignIn: state.auth.userSignIn,
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, { setUserSignIn, setSignUpDataToLocalStorage, setUsers, checkAuthorization })(SignInContainer);
