import React from "react";
import { connect } from "react-redux";
import { setUserSignUp } from "../../redux/auth-reducer";
import Authorization from "./Authorization";

const AuthorizationContainer = props => {
	return <Authorization {...props} a={props.a} />;
};

let mapStateToProps = state => {
	return {
		a: 19,
	};
};

export default connect(mapStateToProps, setUserSignUp)(AuthorizationContainer);
