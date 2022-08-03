import React from "react";
import defaultAvatar from "../../assets/images/DefaultAvatar.png";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { profileConstant } from "../../core/constants/constants";
import { AccountType, FirebaseType } from "../../types/types";
import SearchIcon from "@mui/icons-material/Search";
import { HeaderFormDataPropsType } from "./Header";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";

interface HeaderFormPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  account: AccountType | null;
}

const HeaderForm = (props: InjectedFormProps<HeaderFormDataPropsType, HeaderFormPropsType> & HeaderFormPropsType) => {
  const [toggleField, steToggleField] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const foundAccount: Array<FirebaseType<AccountType>> = props.accounts.filter((account: FirebaseType<AccountType>) => (account.data().surname + " " + account.data().name).toLocaleLowerCase().trim().includes(searchValue.toLocaleLowerCase().trim(), 0) && account.id !== props.account?.id);

  return (
    <form className={styles.form}>
      <div className={styles.wrapper_field}>
        <Field className={toggleField ? styles.showField : styles.hiddenField} name="search" type="search" value={searchValue} onChange={(e: any) => setSearchValue(e.target.value)} placeholder="Search" component="input" autoComplete="off" />
        <IconButton className={styles.search_icon} onClick={() => (toggleField ? steToggleField(false) : steToggleField(true))}>
          <SearchIcon fontSize="small" />
        </IconButton>

        {searchValue && toggleField && (
          <div className={styles.search_menu}>
            {foundAccount.length > 0 ? (
              foundAccount.map((account: FirebaseType<AccountType>) => (
                <MenuItem key={account.id} className={styles.search_menu_item}>
                  <NavLink to={`${profileConstant.path}/${account.id}`} onClick={() => setSearchValue("")}>
                    <Avatar src={account.data().avatar || defaultAvatar} />
                    {account.data().surname + " " + account.data().name}
                  </NavLink>
                </MenuItem>
              ))
            ) : (
              <div className={styles.search_default}>Nothing found</div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

const HeaderReduxForm = reduxForm<HeaderFormDataPropsType, HeaderFormPropsType>({ form: "header_form" })(HeaderForm);

export default HeaderReduxForm;
