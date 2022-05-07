import styles from "./FieldValidationForm.module.scss";

export const required = (value) => {
  if (value) {
    return undefined;
  } else {
<<<<<<< HEAD
    return "This field is required";
    // return <div className={styles.required}>This field is required</div>;
=======
    return <div className={styles.required}>This field is required</div>;
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
  }
};

export const maxLengthCreator = (maxLength) => (value) => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;

export const validateAuthorizationUserCreator = (accounts, userSignIn) => {
  let foundAccount;
  if (accounts) {
<<<<<<< HEAD
    foundAccount = accounts && accounts.find((account) => (account.email === userSignIn.email && account.password === userSignIn.password) || (account.profile && account.profile.email === userSignIn.email && account.profile.password === userSignIn.password));
=======
    foundAccount = accounts && accounts.find((account) => (account.phone_or_email === userSignIn.phone_or_email && account.password === userSignIn.password) || (account.profile && account.profile.phone_or_email === userSignIn.phone_or_email && account.profile.password === userSignIn.password));
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516

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
<<<<<<< HEAD
    foundUser = accounts && accounts.find((account) => (account.profile.email === userSignUp.email ? account : undefined));
=======
    foundUser = accounts && accounts.find((account) => (account.profile.phone_or_email === userSignUp.phone_or_email ? account : undefined));
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516

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

<<<<<<< HEAD
export const validateEmail = (value) => {
  if (value && !/^[\w-.]+@[a-zA-Z]+\.[a-zA-Z]+$/i.test(value)) {
    return "The email you entered isn’t connected to an account.";
=======
export const validatePhoneNumberAndEmail = (value) => {
  if (value && !/^([0-9][0-9]{9})$/i.test(value) && value && !/^[\w-.]+@[a-zA-Z]+\.[a-zA-Z]+$/i.test(value)) {
    return "The email or mobile number you entered isn’t connected to an account.";
>>>>>>> 829743376670bcf6bd688d0d118905c801d65516
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
