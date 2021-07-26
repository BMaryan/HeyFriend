import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import AuthorizationContainer from "./components/Authorization/AuthorizationContainer";
import SignIn from "./components/Authorization/SignIn/SignIn";
import SignUp from "./components/Authorization/SignUp/SignUp";

function App() {
	return (
		<>
			<NavLink exact to='/'>
				Main page
			</NavLink>
			<NavLink to='/authorization'>Authorization</NavLink>

			<div className='App'>
				<Route path='/authorization' render={() => <AuthorizationContainer />} />
				<Route path='/sign_in' render={() => <SignIn />} />
				<Route path='/sign_up' render={() => <SignUp />} />
			</div>
		</>
	);
}

export default App;
