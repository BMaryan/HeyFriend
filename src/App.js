import React from "react";
import { NavLink, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Authorization/SignIn/SignIn";

function App() {
	return (
		<>
			<NavLink exact to='/'>
				Main page
			</NavLink>
			<NavLink to='/sign_in'>Sign in</NavLink>

			<div className='App'>
				<Route path='/sign_in' render={() => <SignIn />} />
			</div>
		</>
	);
}

export default App;
