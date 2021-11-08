export const getUserSignInSelector = state => {
	return state.auth.userSignIn;
};

export const getUserSignUpSelector = state => {
	return state.auth.userSignUp;
};

export const getDefaultAccountSelector = state => {
	return state.auth.defaultAccount;
};
