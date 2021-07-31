/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import { checkAuthorization, setUsers, setUserSignIn } from "../../../redux/auth-reducer";
import { setSignUpDataToLocalStorage } from "../../../utils/helperForAuthorization/helperForAuthorization";
import SignIn from "./SignIn";

class SignInContainer extends React.Component {
	UNSAFE_componentWillMount() {
		let users = JSON.parse(localStorage.getItem("users"));
		this.props.setUsers(users);
	}

	render() {
		setSignUpDataToLocalStorage(this.props);

		return (
			<SignIn
				{...this.props}
				profileAuthorizationData={this.props.profileAuthorizationData}
				checkAuthorization={this.props.checkAuthorization}
				setUserSignIn={this.props.setUserSignIn}
				userSignIn={this.props.userSignIn}
			/>
		);
	}
}

// const SignInContainerA = props => {
// 	setSignUpDataToLocalStorage(props);

// 	React.useEffect(() => {
// 		let users = JSON.parse(localStorage.getItem("users"));
// 		props.setUsers(users);
// 	}, []);

// 	return (
// 		<SignIn
// 			{...props}
// 			profileAuthorizationData={props.profileAuthorizationData}
// 			checkAuthorization={props.checkAuthorization}
// 			setUserSignIn={props.setUserSignIn}
// 			userSignIn={props.userSignIn}
// 		/>
// 	);
// };

const mapStateToProps = state => {
	return {
		users: state.auth.users,
		userSignIn: state.auth.userSignIn,
		profileAuthorizationData: state.auth.profileAuthorizationData,
	};
};

export default connect(mapStateToProps, {
	setUserSignIn,
	setSignUpDataToLocalStorage,
	setUsers,
	checkAuthorization,
})(SignInContainer);
