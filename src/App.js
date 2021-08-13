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
			<div className='container_fluid'>{props.profileAuthorizationData ? <HeaderContainer /> : undefined}</div>
			<div className='container'>
				<div className='App'>
					<Route exact path='/' render={() => <div>Main page</div>} />
					<Route path='/profile' render={() => <ProfileContainer />} />
				</div>
			</div>

			<Route path='/sign_in' render={() => <SignInContainer />} />
			<Route path='/sign_up' render={() => <SignUpContainer />} />
		</>
	);
}

export default App;
