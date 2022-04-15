import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import MainContainer from "./components/Main/MainContainer";
import NotFound from "./components/common/NotFound/NotFound";
import ProfileContainer from "./components/Profile/ProfileContainer";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import CurrentPostContainer from "./components/common/CurrentPost/CurrentPostContainer";
import NavbarRow from "./components/Header/Navbar/NavbarRow/NavbarRow";
import { useLocation } from "react-router-dom";
import { withSuspense } from "./hoc/withSuspense/withSuspense";
import { chatConstant, editConstant, friendsConstant, photoConstant, profileConstant, signInConstant, signUpConstant } from "./core/constants/constants";

// lazy loading
const ChatContainer = React.lazy(() => import("./components/Chat/ChatContainer"));
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));
const EditContainer = React.lazy(() => import("./components/common/Edit/EditContainer"));

function App(props) {
  let location = useLocation();

  let checkSignIn = location.pathname.includes(signInConstant);
  let checkSignUp = location.pathname.includes(signUpConstant);

  return (
    <div className="App">
      {props.account ? (
        <div className="container_fluid container_fluid__position">
          <HeaderContainer />
        </div>
      ) : undefined}

      <div className={props.account ? `container` : "container__auth"}>
        {props.account ? (
          <Switch>
            <Route exact path="/" render={() => <MainContainer />} />
            <Route exact path={`${photoConstant}/:id`} render={() => <CurrentPostContainer />} />
            <Route path={`${profileConstant}/:id?`} render={() => <ProfileContainer />} />
            <Route path={`${chatConstant}/:id?`} render={withSuspense(ChatContainer)} />
            <Route path={`${friendsConstant}`} render={withSuspense(FriendsContainer)} />
            <Route path={`${editConstant}`} render={withSuspense(EditContainer)} />
            <Route path={`${signInConstant}`} render={() => <SignInContainer />} />
            <Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        ) : (
          <>
            <Route path={`${signInConstant}`} render={() => <SignInContainer />} />
            <Route path={`${signUpConstant}`} render={() => <SignUpContainer />} />
          </>
        )}
      </div>

      {!(checkSignIn || checkSignUp) ? (
        <div className="container_fluid container_fluid__paper">
          <NavbarRow {...props} isBottomNavigation={true} />
        </div>
      ) : undefined}
    </div>
  );
}

export default App;
