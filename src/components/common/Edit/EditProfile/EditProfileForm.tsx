import React from "react";
import { validateEmail, required, validateFirstAndLastNameCreator } from "../../../../utils/FieldValidationForm/FieldValidationForm";
import { WrapperCreateField, InputField, WrapperButton } from "../../FormControls/FormControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { EditProfileFormDataType } from "./EditProfile";
import { StateType } from "../../../../redux/store";
import styles from "../Edit.module.scss";
import { connect } from "react-redux";

const validateFirstName = validateFirstAndLastNameCreator("first");
const validateLastName = validateFirstAndLastNameCreator("last");

type OwnPropsType = {
  authError: string | null;
  loading: boolean;
};

type MapStateToPropsType = {};

type MapDispatchToPropsType = {};

export type SignUpFormPropsType = OwnPropsType & MapStateToPropsType & MapDispatchToPropsType;

const EditProfileForm = (props: InjectedFormProps<EditProfileFormDataType, SignUpFormPropsType> & SignUpFormPropsType) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Name</div>
        <div className={styles.action}>
          <WrapperCreateField name="name" type="text" label="Name" helperText="" placeholder="" validate={[validateFirstName]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Surname</div>
        <div className={styles.action}>
          <WrapperCreateField name="surname" type="text" label="Surname" helperText="" placeholder="" validate={[validateLastName]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Email *</div>
        <div className={styles.action}>
          <WrapperCreateField name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>Status</div>
        <div className={styles.action}>
          <WrapperCreateField name="status" type="text" label="Status" helperText="" placeholder="" validate={[]} component={InputField} />
        </div>
      </div>
      <div className={styles.wrapper_block}>
        <div className={styles.key}>About</div>
        <div className={styles.action}>
          <WrapperCreateField name="aboutMe" type="text" label="About me" helperText="" validate={[]} component={InputField} />
        </div>
      </div>

      <div className={styles.wrapper_button}>
        <WrapperButton authError={props.authError} loading={props.loading} button_text="Submit" invalid={props.invalid} submitting={props.submitting} anyTouched={props.anyTouched} dirty={props.dirty} />
      </div>
    </form>
  );
};

const EditProfileReduxForm = reduxForm<EditProfileFormDataType, SignUpFormPropsType>({ form: "edit_profile", enableReinitialize: true })(EditProfileForm);

const mapStateToProps = (state: StateType): MapStateToPropsType => {
  return {
    initialValues: state?.accountPage?.account,
  };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, StateType>(mapStateToProps, {})(EditProfileReduxForm);
