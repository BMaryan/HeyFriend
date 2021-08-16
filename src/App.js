import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import MainContainer from "./components/Main/MainContainer";
import NotFound from "./components/common/NotFound/NotFound";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ChatContainer from "./components/Chat/ChatContainer";

function App(props) {
	return (
		<>
			<div className='container_fluid'>{props.profileAuthorizationData ? <HeaderContainer /> : undefined}</div>
			<div className='container'>
				<Switch>
					<Route exact path='/' render={() => <MainContainer />} />
					<Route path='/profile' render={() => <ProfileContainer />} />
					<Route path='/chat' render={() => <ChatContainer />} />
					<Route path='/sign_in' render={() => <SignInContainer />} />
					<Route path='/sign_up' render={() => <SignUpContainer />} />
					<Route path='*' render={() => <NotFound />} />
				</Switch>
			</div>
		</>
	);
}

export default App;
