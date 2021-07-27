import React from "react";
import { connect } from "react-redux";
import { setUserSignUp } from "../../../redux/auth-reducer";
import SignUp from "./SignUp";

const SignUpContainer = props => {
	return <SignUp {...props} setUserSignUp={props.setUserSignUp} />;
};

const mapStateToProps = state => {
	return {};
};

export default connect(mapStateToProps, { setUserSignUp })(SignUpContainer);
