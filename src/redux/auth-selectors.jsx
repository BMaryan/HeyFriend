export const getUsersSelector = state => {
	return state.auth.users;
};

export const getUserSignInSelector = state => {
	return state.auth.userSignIn;
};

export const getUserSignUpSelector = state => {
	return state.auth.userSignUp;
};

export const getProfileAuthorizationDataSelector = state => {
	return state.auth.profileAuthorizationData;
};
