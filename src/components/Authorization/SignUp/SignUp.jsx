/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styles from "./SignUp.module.css";
import commonStyle from "../Authorization.module.css";
import SignUpReduxForm from "./SignUpForm";
import { AuthorizationHelperContainer, InformationContainer } from "../../../utils/helperForAuthorization/helperForAuthorization";
import { Redirect } from "react-router";
import { profileConstant } from "../../../core/constants/constants";

const SignUp = props => {
	let onSubmit = formData => {
		props.setUserSignUp(formData);

		if (formData) {
			props.isAccount({ id: props.accounts ? props.accounts.length + 1 : undefined, profile: { ...formData } });
		}
	};

	if (props.account && props.account.id) {
		return <Redirect to={`${profileConstant}`} />;
	}

	return (
		<div className={commonStyle.authorization}>
			<div className={props.toggleShowSign ? commonStyle.authorization_container : commonStyle.authorization_container_position}>
				<AuthorizationHelperContainer
					title={"Sign Up"}
					form={<SignUpReduxForm onSubmit={onSubmit} accounts={props.accounts} userSignUp={props.userSignUp} />}
				/>
				<InformationContainer
					title={"Welcome Back!"}
					subtitle={"Don't have an account?"}
					linkTo='/authorization'
					buttonText={"Sign In"}
					setToggleShowSign={props.setToggleShowSign}
				/>
			</div>
		</div>
	);
};

export default SignUp;
