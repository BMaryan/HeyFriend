import React from "react";
import { editConstant, editPasswordConstant, editProfileConstant } from "../../../core/constants/constants";
import { AccountType, HistoryType } from "../../../types/types";
import ChangePassword from "./ChangePassword/ChangePassword";
import EditProfile from "./EditProfile/EditProfile";
import GoBackHead from "../GoBackHead/GoBackHead";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import styles from "./Edit.module.scss";
import Default from "./Default/Default";
import Media from "react-media";

interface EditPropsType {
  account: AccountType | null;
  authError: string | null;
  loading: boolean;
  history: HistoryType;
  id: string;
  updateAccountThunk: (account: AccountType) => void;
}

const Edit = (props: EditPropsType) => {
  const title = {
    profile: editProfileConstant.title,
    password: editPasswordConstant.title,
    appsAndWeb: "Apps and Websites",
  };

  const path = {
    profile: editProfileConstant.path,
    password: editPasswordConstant.path,
    manageAccess: "manage_access",
  };

  const checkProfile = props.history.location.pathname.includes(path.profile);
  const checkPassword = props.history.location.pathname.includes(path.password);
  const checkManageAccess = props.history.location.pathname.includes(path.manageAccess);

  return (
    <div className={styles.edit}>
      {/* head for go back */}
      {checkProfile || checkPassword || checkManageAccess ? <Media query={{ maxWidth: 399 }}>{(matches) => (matches ? <GoBackHead title={checkProfile ? title.profile : checkPassword ? title.password : checkManageAccess ? title.appsAndWeb : ""} history={props.history} /> : <></>)}</Media> : undefined}

      {/* menu */}
      <div className={!(checkProfile || checkPassword || checkManageAccess) ? styles.edit_menu : styles.edit_menu__none}>
        <ul className={styles.menu}>
          <li className={styles.edit_item}>
            <NavLink exact to={`${editConstant.path}${path.profile}`} className={styles.item} activeClassName={styles.item_active}>
              {title.profile}
            </NavLink>
          </li>
          <li className={styles.edit_item}>
            <NavLink exact to={`${editConstant.path}${path.password}`} className={styles.item} activeClassName={styles.item_active}>
              {title.password}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* content */}
      <div className={styles.edit_content}>
        <Route exact path={`${editConstant.path}${path.profile}`} render={() => <EditProfile account={props.account} authError={props.authError} loading={props.loading} updateAccountThunk={props.updateAccountThunk} />} />
        <Route exact path={`${editConstant.path}${path.password}`} render={() => <ChangePassword account={props.account} authError={props.authError} loading={props.loading} updateAccountThunk={props.updateAccountThunk} />} />
        <Route exact path={`${editConstant.path}`} render={() => <Default />} />
      </div>
    </div>
  );
};

export default Edit;
