export const required = (value) => {
  if (value) {
    return undefined;
  } else {
    return "This field is required";
  }
};

export const maxLengthCreator = (maxLength) => (value) => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;

export const validateAuthorizationUserCreator = (accounts, userSignIn) => {
  let foundAccount;
  if (accounts) {
    foundAccount = accounts && accounts.find((account) => (account.email === userSignIn.email && account.password === userSignIn.password) || (account?.email === userSignIn.email && account?.password === userSignIn.password));

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
    foundUser = accounts && accounts.find((account) => (account.email === userSignUp.email ? account : undefined));

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
    return value.includes("@") ? `The email you entered isn’t connected to an account.` : `You missed the @ symbol. Please enter your email correctly.`;
  } else {
    return undefined;
  }
};

export const validatePassword = (value) => {
  if (value && !/^[\w.]{8,15}$/i.test(value)) {
    return `Sorry, your password is incorrect. ${value.length > 8 ? `You have entered too many characters: ${value.length}. Maximum characters must be 15` : `You didn't enter enough characters: ${value.length}. Minimum characters must be 8`}`;
  } else {
    return undefined;
  }
};
