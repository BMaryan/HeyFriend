import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Login/SignIn/SignIn";

function App() {
	return (
		<div>
			<NavLink to='/sign_in'>Sign in</NavLink>

			<Route path='/sign_in' render={() => <SignIn />} />
		</div>
	);
}

export default App;
