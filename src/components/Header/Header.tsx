import React from "react";
import { mainConstant } from "../../core/constants/constants";
import { HeaderContainerPropsType } from "./HeaderContainer";
import NavbarList from "./Navbar/NavbarList/NavbarList";
import NavbarRow from "./Navbar/NavbarRow/NavbarRow";
import { LocationType } from "../../types/types";
import Logo from "../../assets/images/insta.png";
import HeaderReduxForm from "./HeaderForm";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderPropsType extends HeaderContainerPropsType {
  location: LocationType;
}

export interface HeaderFormDataPropsType {
  header_form: string;
}

const Header = (props: HeaderPropsType) => {
  const onsubmit = (formData: HeaderFormDataPropsType) => {};

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

          <HeaderReduxForm accounts={props.accounts} account={props.account} onChange={onsubmit} />
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
