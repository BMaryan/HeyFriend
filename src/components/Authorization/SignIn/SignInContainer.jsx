import React from "react";
import { connect } from "react-redux";
import { setUserSignIn } from "../../../redux/auth-reducer";
import SignIn from "./SignIn";

const SignInContainer = props => {
	return <SignIn {...props} setUserSignIn={props.setUserSignIn} />;
};

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps, { setUserSignIn })(SignInContainer);
