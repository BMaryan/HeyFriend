/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List, ListItem, ListItemText, ListSubheader, ListItemButton, ListItemAvatar, Button } from "@mui/material";
import { validateEmail, validatePassword, required } from "../../../utils/FieldValidationForm/FieldValidationForm";
import { WrapperCreateField, InputField, WrapperButton } from "../../common/FormControls/FormControls";
import { SelectTeamIllustration } from "../../../assets/illustrations/SelectTeamIllustration";
import { DuplicateCodeFunc } from "../../../utils/helperForProfile/helperForProfile";
import { heyFriendStyleConstant } from "../../../core/constants/constantsStyles";
import { AccountType, FirebaseType, SignType } from "../../../types/types";
import { InjectedFormProps, reduxForm } from "redux-form";
import commonStyles from "../Authorization.module.scss";
import CustomAvatar from "../../atoms/Avatar/Avatar";
import { SignInFormDataType } from "./SignIn";
import styles from "./SignIn.module.scss";

interface SignInFormPropsType {
  accounts: Array<FirebaseType<AccountType>>;
  authError: string | null;
  loading: boolean;
  signIn: (credentials: SignType) => void;
}

const SignInForm = (props: InjectedFormProps<SignInFormDataType, SignInFormPropsType> & SignInFormPropsType) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<AccountType | null>(null);
  const checkLengthOfAccounts = props.accounts?.length > 0;

  React.useEffect(() => {
    if (selectedAccount?.email && selectedAccount?.password) {
      props.signIn({
        email: selectedAccount?.email,
        password: selectedAccount?.password,
      });
    }
  }, [selectedAccount]);

  return (
    <form className={commonStyles.form} onSubmit={props.handleSubmit}>
      <WrapperCreateField name="email" type="email" label="Email" helperText="" placeholder="" validate={[validateEmail, required]} component={InputField} />
      <WrapperCreateField name="password" type="password" label="Password" helperText="" placeholder="" validate={[validatePassword, required]} component={InputField} />

      <div className={styles.wrapper_buttons}>
        <div className={styles.wrapper_buttons}>
          <WrapperButton authError={props.authError} loading={props.loading} button_text="Sign In" invalid={props.invalid} submitting={props.submitting} anyTouched={props.anyTouched} dirty={props.dirty} />
        </div>

        <div className={styles.wrapper_buttons}>
          <Button variant="contained" size="large" sx={{ textTransform: "capitalize" }} onClick={() => setOpenModal(true)}>
            Default accounts
          </Button>
        </div>
      </div>

      {/* modal of default accounts  */}
      <DuplicateCodeFunc open={openModal} close={() => setOpenModal(false)} class={styles.modal_of_default_accounts}>
        <List sx={{ padding: "0 0" }}>
          <ListSubheader sx={{ background: "transparent", fontSize: "18px", textAlign: "center" }} component={"div"}>
            {checkLengthOfAccounts ? "Select an account" : "There are no accounts"}
          </ListSubheader>

          {checkLengthOfAccounts && <SelectTeamIllustration height="100%" width="100%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />}

          {checkLengthOfAccounts ? (
            props.accounts?.slice(0, props.accounts?.length > 3 ? 3 : props.accounts?.length).map((account: FirebaseType<AccountType>) => (
              <ListItem key={account.id} sx={{ padding: "8px 0 0 0" }} onClick={() => setSelectedAccount(account.data())}>
                <ListItemButton>
                  <ListItemAvatar>
                    <CustomAvatar avatarData={account.data()} />
                  </ListItemAvatar>

                  <ListItemText primary={account.data().surname + " " + account.data().name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <SelectTeamIllustration height="100%" width="100%" mainColor={heyFriendStyleConstant.first} minorColor={heyFriendStyleConstant.second} />
          )}
        </List>
      </DuplicateCodeFunc>
    </form>
  );
};

const SignInReduxForm = reduxForm<SignInFormDataType, SignInFormPropsType>({ form: "sign_in" })(SignInForm);

export default SignInReduxForm;
