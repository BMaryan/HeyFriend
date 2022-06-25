import React from "react";
import { chatConstant, editConstant, friendsConstant, mainConstant, photoConstant, profileConstant, signInConstant, signUpConstant } from "./core/constants/constants";
import CurrentPostContainer from "./components/common/CurrentPost/CurrentPostContainer";
import SignInContainer from "./components/Authorization/SignIn/SignInContainer";
import SignUpContainer from "./components/Authorization/SignUp/SignUpContainer";
import NavbarRow from "./components/Header/Navbar/NavbarRow/NavbarRow";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { withSuspense } from "./hoc/withSuspense/withSuspense";
import NotFound from "./components/common/NotFound/NotFound";
import MainContainer from "./components/Main/MainContainer";
import { Route, Switch } from "react-router-dom";
import { HistoryType } from "./types/types";
import "./App.scss";

const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer"));
const EditContainer = React.lazy(() => import("./components/common/Edit/EditContainer"));
const ChatContainer = React.lazy(() => import("./components/Chat/ChatContainer"));

type AppPropsType = {
  auth: object | null;
  history: HistoryType;
  id: string;
};

function App(props: AppPropsType) {
  let checkSignIn = props.history.location.pathname.includes(signInConstant.path);
  let checkSignUp = props.history.location.pathname.includes(signUpConstant.path);

  return (
    <div className="App">
      {props.auth ? (
        <div className="container_fluid container_fluid__position">
          <HeaderContainer />
        </div>
      ) : undefined}

      <div className={props.auth ? `container` : "container__auth"}>
        <Switch>
          <Route exact path={`${mainConstant.path}`} render={() => <MainContainer />} />
          <Route exact path={`${photoConstant.path}/:id`} render={() => <CurrentPostContainer />} />
          <Route path={`${profileConstant.path}/:id`} render={() => <ProfileContainer />} />
          <Route path={`${chatConstant.path}/:id?`} render={withSuspense(ChatContainer)} />
          <Route path={`${friendsConstant.path}`} render={withSuspense(FriendsContainer)} />
          <Route path={`${editConstant.path}`} render={withSuspense(EditContainer)} />
          <Route path={`${signInConstant.path}`} render={() => <SignInContainer />} />
          <Route path={`${signUpConstant.path}`} render={() => <SignUpContainer />} />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </div>

      {!(checkSignIn || checkSignUp) ? (
        <div className="container_fluid container_fluid__paper">
          <NavbarRow isBottomNavigation={true} location={props.history.location} />
        </div>
      ) : undefined}
    </div>
  );
}

export default App;
