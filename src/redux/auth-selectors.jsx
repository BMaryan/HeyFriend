export const getUserSignInSelector = (state) => state.auth.userSignIn;

export const getUserSignUpSelector = (state) => state.auth.userSignUp;

// --------------------------

export const setAuthSelector = (state) => state.auth.auth;

export const authLoadingSelector = (state) => state.auth.loading;

export const authErrorSelector = (state) => state.auth.authError;
