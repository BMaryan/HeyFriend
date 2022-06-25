import React from "react";
import { mainConstant } from "../../core/constants/constants";
import { AccountType, LocationType } from "../../types/types";
import NavbarList from "./Navbar/NavbarList/NavbarList";
import NavbarRow from "./Navbar/NavbarRow/NavbarRow";
import Logo from "../../assets/images/insta.png";
import HeaderReduxForm from "./HeaderForm";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderPropsType {
  accounts: Array<AccountType>;
  account: AccountType | null;
  location: LocationType;
  signOut: any;
}

const Header = (props: HeaderPropsType) => {
  // let [searchValue, setSearchValue] = React.useState('');

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
          <NavbarRow isBottomNavigation={true} location={props.location} />
        </div>

        {/* navBar list */}
        <div className={styles.navbar_list}>
          <NavbarList accounts={props.accounts} account={props.account} signOut={props.signOut} />
        </div>
      </div>
    </div>
  );
};

export default Header;
