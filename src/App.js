import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

function App(props) {
	return (
		<>
			<HeaderContainer />

			<div className='App'>
				<Route path='/profile' render={() => <ProfileContainer />} />
				<Route path='/sign_in' render={() => <SignInContainer />} />
				<Route path='/sign_up' render={() => <SignUpContainer />} />
			</div>
		</>
	);
}

export default App;
