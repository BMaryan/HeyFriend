import React from "react";
import { AccountType, FirebaseType, LocationType, MessageType } from "../../types/types";
import { getAccountSelector } from "../../redux/account-selectors";
import { getMessagesSelector } from "../../redux/chat-selectors";
import { signOut } from "../../redux/auth-reducer";
import { useLocation } from "react-router-dom";
import { StateType } from "../../redux/store";
import { connect } from "react-redux";
import Header from "./Header";

type OwnPropsType = {};

type MapStateToPropsType = {
  account: AccountType | null;
  messages: Array<FirebaseType<MessageType>>;
};

type MapDispatchToPropsType = {
  signOut: any;
};

export type HeaderContainerPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const HeaderContainer = (props: HeaderContainerPropsType) => {
  // const [darkTheme, setDarkTheme] = React.useState(false);
  const location = useLocation<LocationType>();

  // React.useEffect(() => {
  //   const root = document.documentElement;
  //   root.style.setProperty("--white", darkTheme ? "#212121" : "white");
  //   root.style.setProperty("--black", darkTheme ? "white" : "black");
  //   root.style.setProperty("--grey100", darkTheme ? "#18191A" : "#f5f5f5");
  //   root.style.setProperty("--grey200", darkTheme ? "#eeeeee" : "#eeeeee");
  //   root.style.setProperty("--grey300", darkTheme ? "#e0e0e0" : "#e0e0e0");
  //   root.style.setProperty("--grey400", darkTheme ? "#bdbdbd" : "#bdbdbd");
  //   root.style.setProperty("--grey500", darkTheme ? "#9e9e9e" : "#9e9e9e");
  //   root.style.setProperty("--grey600", darkTheme ? "#757575" : "#757575");
  //   root.style.setProperty("--grey700", darkTheme ? "#616161" : "#616161");
  //   root.style.setProperty("--grey800", darkTheme ? "white" : "#424242");
  //   root.style.setProperty("--grey900", darkTheme ? "white" : "#212121");
  // }, [darkTheme]);

  return <Header {...props} location={location} />;
};

const mapStateToProps = (state: StateType): MapStateToPropsType => ({ account: getAccountSelector(state), messages: getMessagesSelector(state) });

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, { signOut })(HeaderContainer);
