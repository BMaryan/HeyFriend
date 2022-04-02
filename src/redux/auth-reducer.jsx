let SET_USER_SIGN_IN = "heyfriend/auth/SET_USER_SIGN_IN";
let SET_USER_SIGN_UP = "heyfriend/auth/SET_USER_SIGN_UP";
let GET_DEFAULT_ACCOUNT = "heyfriend/auth/GET_DEFAULT_ACCOUNT";

let initialState = {
  userSignIn: {
    phone_or_email: null,
    password: null,
    rememberMe: null,
  },
  userSignUp: {
    id: null,
    name: null,
    surname: null,
    phone_or_email: null,
    password: null,
  },
  defaultAccount: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SIGN_IN: {
      return {
        ...state,
        userSignIn: { ...action.data },
      };
    }
    case SET_USER_SIGN_UP: {
      return {
        ...state,
        userSignUp: { ...action.data },
      };
    }
    case GET_DEFAULT_ACCOUNT: {
      return {
        ...state,
        defaultAccount: action.account ? action.account : null,
      };
    }
    default: {
      return state;
    }
  }
};

export const setUserSignIn = ({ phone_or_email, password, rememberMe = false }) => ({
  type: SET_USER_SIGN_IN,
  data: { phone_or_email, password, rememberMe },
});

export const setUserSignUp = ({ name, surname, phone_or_email, password }) => ({
  type: SET_USER_SIGN_UP,
  data: { name, surname, phone_or_email, password },
});

export const getDefaultAccount = (account) => ({
  type: GET_DEFAULT_ACCOUNT,
  account,
});

export default AuthReducer;
