import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

function App() {
	return (
		<>
			<NavLink exact to='/'>
				Main page
			</NavLink>
			<NavLink to='/sign_up'>Sign Up</NavLink>
			<NavLink to='/profile'>Profile</NavLink>

			<div className='App'>
				<Route path='/profile' render={() => <ProfileContainer />} />
				<Route path='/sign_in' render={() => <SignInContainer />} />
				<Route path='/sign_up' render={() => <SignUpContainer />} />
			</div>
		</>
	);
}

export default App;
