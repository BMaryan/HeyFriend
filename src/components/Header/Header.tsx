import React from "react";
import { AccountType, FirebaseType, LocationType, MessageType } from "../../types/types";
import { mainConstant } from "../../core/constants/constants";
import NavbarList from "./Navbar/NavbarList/NavbarList";
import NavbarRow from "./Navbar/NavbarRow/NavbarRow";
import Logo from "../../assets/images/insta.png";
import HeaderReduxForm from "./HeaderForm";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderPropsType {
  account: AccountType | null;
  messages: Array<FirebaseType<MessageType>>;
  location: LocationType;
  signOut: any;
}

const Header = (props: HeaderPropsType) => {
  // const [searchValue, setSearchValue] = React.useState('');

  const onsubmit = (formData: { header_form: string }) => {
    // setSearchValue(formData.search);
  };

  function refreshPage() {
    window.location.href = mainConstant.path;
  }

  return (
    <div className={styles.header}>
      <div className={"container" + " " + styles.header_container}>
        {/* logo */}
        <div className={styles.header_logo}>
          <NavLink to={mainConstant.path} onClick={() => refreshPage()}>
            <img src={Logo} alt="" />
          </NavLink>

          <HeaderReduxForm onChange={onsubmit} />
        </div>

        {/* navBar row */}
        <div className={styles.navbar_row}>
          <NavbarRow messages={props.messages} isBottomNavigation={true} location={props.location} />
        </div>

        {/* navBar list */}
        <div className={styles.navbar_list}>
          <NavbarList account={props.account} signOut={props.signOut} />
        </div>
      </div>
    </div>
  );
};

export default Header;
