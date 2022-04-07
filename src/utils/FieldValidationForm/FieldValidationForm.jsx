import styles from "./FieldValidationForm.module.css";

export const required = (value) => {
  if (value) {
    return undefined;
  } else {
    return <div className={styles.required}>This field is required</div>;
  }
};

export const maxLengthCreator = (maxLength) => (value) => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;

export const validateAuthorizationUserCreator = (accounts, userSignIn) => {
  let foundAccount;
  if (accounts) {
    foundAccount = accounts && accounts.find((account) => (account.email === userSignIn.email && account.password === userSignIn.password) || (account.profile && account.profile.email === userSignIn.email && account.profile.password === userSignIn.password));

    if (foundAccount) {
      return undefined;
    } else {
      return "No such account found. You can check the correctness of data entry or register.";
    }
  }
};

export const validateFindTheSameUserCreator = (accounts, userSignUp) => {
  let foundUser;
  if (accounts) {
    foundUser = accounts && accounts.find((account) => (account.profile.email === userSignUp.email ? account : undefined));

    if (!foundUser) {
      return undefined;
    } else {
      return "An account already exists with this email.";
    }
  }
};

export const validateFirstAndLastNameCreator = (nameField) => (value) => {
  if (value && !/^[a-z ,.'-]+$/i.test(value)) {
    return `Enter ${nameField} name`;
  } else {
    return undefined;
  }
};

export const validateEmail = (value) => {
  if (value && !/^[\w-.]+@[a-zA-Z]+\.[a-zA-Z]+$/i.test(value)) {
    return "The email you entered isn’t connected to an account.";
  } else {
    return undefined;
  }
};

export const validatePassword = (value) => {
  if (value && !/^[\w.]{8,}$/i.test(value)) {
    return "Sorry, your password was incorrect. Please double-check your password.";
  } else {
    return undefined;
  }
};
