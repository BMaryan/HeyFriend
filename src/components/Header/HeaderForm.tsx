import React from "react";
import styles from "./Header.module.scss";
import { Field, reduxForm } from "redux-form";

interface HeaderFormPropsType {}

const HeaderForm = (props: HeaderFormPropsType) => {
  const [toggleField, steToggleField] = React.useState(false);

  return (
    <form className={styles.form}>
      <div className={styles.wrapper_field}>
        <Field className={toggleField ? styles.showField : styles.hiddenField} name="search" type="search" placeholder="Search" component="input" />
        {/* <FontAwesomeIcon onClick={() => (toggleField ? steToggleField(false) : steToggleField(true))} className={styles.search_icon} icon={faSearch} /> */}
      </div>
    </form>
  );
};

const HeaderReduxForm = reduxForm({ form: "header_form" })(HeaderForm);

export default HeaderReduxForm;
