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
import FriendsContainer from "./components/Friends/FriendsContainer";
import EditContainer from "./components/common/Edit/EditContainer";
import AuthorizationContainer from "./components/Authorization/AuthorizationContainer";

function App(props) {
	return (
		<div className='App'>
			<div className='container_fluid'>{props.account ? <HeaderContainer /> : undefined}</div>
			<div className='container container_margin'>
				<Switch>
					<Route exact path='/' render={() => <MainContainer />} />
					<Route path='/profile/:id?' render={() => <ProfileContainer />} />
					<Route path='/chat/:id?' render={() => <ChatContainer />} />
					<Route path='/friends/:id?' render={() => <FriendsContainer />} />
					<Route path='/account/edit' render={() => <EditContainer />} />
					{/* <Route path='/sign_in' render={() => <SignInContainer />} />
					<Route path='/sign_up' render={() => <SignUpContainer />} /> */}
					<Route path='/authorization' render={() => <AuthorizationContainer />} />
					<Route path='*' render={() => <NotFound />} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
