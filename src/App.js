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
import AuthorizationContainer from "./components/Authorization/AuthorizationContainer";
import { authorizationConstant, chatConstant, editConstant, friendsConstant, profileConstant } from "./core/constants/constants";

function App(props) {
	return (
		<div className='App'>
			<div className='container_fluid'>{props.account ? <HeaderContainer /> : undefined}</div>
			<div className='container container_margin'>
				<Switch>
					<Route exact path='/' render={() => <MainContainer />} />
					<Route path={`${profileConstant}/:id?`} render={() => <ProfileContainer />} />
					<Route path={`${chatConstant}/:id?`} render={() => <ChatContainer />} />
					<Route path={`${friendsConstant}/:id?`} render={() => <FriendsContainer />} />
					<Route path={`${editConstant}`} render={() => <EditContainer />} />
					<Route path={`${authorizationConstant}`} render={() => <AuthorizationContainer />} />
					<Route path='*' render={() => <NotFound />} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
