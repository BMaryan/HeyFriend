export const getProfilesSelector = state => {
	return state.profilePage.profiles;
};

export const getProfileSelector = state => {
	return state.profilePage.profile;
};

export const getAuthorizationIdSelector = state => {
	return state.profilePage.id;
};
