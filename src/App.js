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
import { chatConstant, editConstant, friendsConstant, profileConstant, signInConstant, signUpConstant } from "./core/constants/constants";
import { Redirect } from "react-router";

function App(props) {
	return (
		<div className='App'>
			<div className='container_fluid'>{props.account ? <HeaderContainer /> : undefined}</div>
			<div className='container container_margin'>
				{props.account ? (
					<Switch>
						<Route exact path='/' render={() => <MainContainer />} />
						<Route path={`${profileConstant}/:id?`} render={() => <ProfileContainer />} />
						<Route path={`${chatConstant}/:id?`} render={() => <ChatContainer />} />
						<Route path={`${friendsConstant}/:id?`} render={() => <FriendsContainer />} />
						<Route path={`${editConstant}`} render={() => <EditContainer />} />
						<Route path={`${signInConstant}`} render={() => <SignInContainer />} />
						<Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
						<Route path='*' render={() => <NotFound />} />
					</Switch>
				) : (
					<>
						<Route path='*' render={() => <Redirect to={signUpConstant} />} />
						<Route path={`${signInConstant}`} render={() => <SignInContainer />} />
						<Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
					</>
				)}
			</div>
		</div>
	);
}

export default App;
