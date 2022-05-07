import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getAccountsSelector, getAccountSelector } from "../../redux/profile-selectors";
import { getAuthorizationId, getParamsId, getProfileData, isAccount } from "../../redux/profile-reducer";
import { signOut } from "../../redux/auth-reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signInConstant } from "../../core/constants/constants";
import { useHistory } from "react-router-dom";

const HeaderContainer = (props) => {
<<<<<<< HEAD
  let history = useHistory();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("logout");

        history.push(`${signInConstant}`);
      }
    });
  }, []);

  return <Header {...props} />;
=======
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--white", darkTheme ? "#212121" : "white");
    root.style.setProperty("--black", darkTheme ? "white" : "black");
    root.style.setProperty("--grey100", darkTheme ? "#18191A" : "#f5f5f5");
    root.style.setProperty("--grey200", darkTheme ? "#eeeeee" : "#eeeeee");
    root.style.setProperty("--grey300", darkTheme ? "#e0e0e0" : "#e0e0e0");
    root.style.setProperty("--grey400", darkTheme ? "#bdbdbd" : "#bdbdbd");
    root.style.setProperty("--grey500", darkTheme ? "#9e9e9e" : "#9e9e9e");
    root.style.setProperty("--grey600", darkTheme ? "#757575" : "#757575");
    root.style.setProperty("--grey700", darkTheme ? "#616161" : "#616161");
    root.style.setProperty("--grey800", darkTheme ? "white" : "#424242");
    root.style.setProperty("--grey900", darkTheme ? "white" : "#212121");
  }, [darkTheme]);

  return <Header {...props} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />;
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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
<<<<<<< HEAD
  signOut,
=======
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
})(HeaderContainer);
