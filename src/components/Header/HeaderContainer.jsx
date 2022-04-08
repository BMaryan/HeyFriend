import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getAuthorizationId, getParamsId, getProfileData, isAccount } from "../../redux/profile-reducer";
import { signOut } from "../../redux/auth-reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Redirect } from "react-router-dom";
import { signInConstant } from "../../core/constants/constants";
import { useHistory } from "react-router-dom";

const HeaderContainer = (props) => {
  let history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("logout");

        history.push(`${signInConstant}`);
        // return <Redirect to={`${signInConstant}`} />;
      }
    });
  }, []);

  return <Header {...props} />;
};

const mapStateToProps = (state) => {
  return {
    accounts: getAccountsSelector(state),
    account: getAccountSelector(state),
  };
};

export default connect(mapStateToProps, {
  isAccount,
  getProfileData,
  getParamsId,
  getAuthorizationId,
  signOut,
})(HeaderContainer);
