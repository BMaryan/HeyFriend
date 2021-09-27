export const getAccountsSelector = state => {
	return state.profilePage.accounts;
};

export const getAccountSelector = state => {
	return state.profilePage.account;
};

export const getAuthorizationIdSelector = state => {
	return state.profilePage.id;
};
