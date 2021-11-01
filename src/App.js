import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import MainContainer from "./components/Main/MainContainer";
import NotFound from "./components/common/NotFound/NotFound";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import EditContainer from "./components/common/Edit/EditContainer";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import {
	chatConstant,
	editConstant,
	friendsConstant,
	photoConstant,
	profileConstant,
	signInConstant,
	signUpConstant,
} from "./core/constants/constants";
// import { Redirect } from "react-router";
import CurrentPostContainer from "./components/common/CurrentPost/CurrentPostContainer";
import NavbarRow from "./components/Header/Navbar/NavbarRow/NavbarRow";
import { useLocation } from "react-router-dom";

function App(props) {
	let location = useLocation();

	let checkSignIn = location.pathname.includes(signInConstant);
	let checkSignUp = location.pathname.includes(signUpConstant);

	return (
		<div className='App'>
			{props.account ? (
				<div className='container_fluid container_fluid__position'>
					<HeaderContainer />
				</div>
			) : undefined}

			<div className={props.account ? `container` : "container__auth"}>
				{props.account ? (
					<Switch>
						<Route exact path='/' render={() => <MainContainer />} />
						<Route exact path={`${photoConstant}/:id`} render={() => <CurrentPostContainer />} />
						<Route path={`${profileConstant}/:id?`} render={() => <ProfileContainer />} />
						<Route path={`${chatConstant}/:id?`} render={() => <ChatContainer />} />
						<Route path={`${friendsConstant}`} render={() => <FriendsContainer />} />
						<Route path={`${editConstant}`} render={() => <EditContainer />} />
						<Route path={`${signInConstant}`} render={() => <SignInContainer />} />
						<Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
						<Route path='*' render={() => <NotFound />} />
					</Switch>
				) : (
					<>
						{/* <Route path='*' render={() => <Redirect to={signUpConstant} />} /> */}
						<Route path={`${signInConstant}`} render={() => <SignInContainer />} />
						<Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
					</>
				)}
			</div>

			{!(checkSignIn || checkSignUp) ? (
				<div className='container_fluid container_fluid__paper'>
					<NavbarRow {...props} isBottomNavigation={true} />
				</div>
			) : undefined}
		</div>
	);
}

export default App;
