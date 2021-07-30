/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { setUsers, setUserSignUp } from "../../../redux/auth-reducer";
import { setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignUp from "./SignUp";

const SignUpContainer = props => {
	setSignUpDataToLocalStorage(props);

	React.useEffect(() => {
		let users = JSON.parse(localStorage.getItem("users"));
		props.setUsers(users);
	}, []);

	return <SignUp {...props} userSignUp={props.userSignUp} setUsers={props.setUsers} setUserSignUp={props.setUserSignUp} users={props.users} />;
};

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignUp: state.auth.userSignUp,
	};
};

export default connect(mapStateToProps, { setUserSignUp, setUsers, setSignUpDataToLocalStorage })(SignUpContainer);
