/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthorization, setUsers, setUserSignIn } from "../../../redux/auth-reducer";
import { setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";

const SignInContainer = props => {
	setSignUpDataToLocalStorage(props);

	useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		props.setUsers(users);
	}, []);

	return <SignIn {...props} checkAuthorization={props.checkAuthorization} setUserSignIn={props.setUserSignIn} userSignIn={props.userSignIn} />;
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignIn: state.auth.userSignIn,
	};
};

export default connect(mapStateToProps, { setUserSignIn, setSignUpDataToLocalStorage, setUsers, checkAuthorization })(SignInContainer);
