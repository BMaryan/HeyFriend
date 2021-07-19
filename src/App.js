import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Login/SignIn/SignIn";

function App() {
	return (
		<div>
			<Route
				path='/sign_in'
				render={() => {
					<SignIn />;
				}}
			/>
			<NavLink to='/sign_in'>Sign in</NavLink>
		</div>
	);
}

export default App;
