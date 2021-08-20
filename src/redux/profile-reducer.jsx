let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";

let initialState = {
	// profile: {
	// 	id: null,
	// 	name: null,
	// 	surname: null,
	// 	img: null,
	// 	status: null,
	// 	aboutMe: null,
	// },
	profile: null,
};

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE_DATA: {
			return {
				...state,
				profile: action.profile ? { ...state.profile, ...action.profile } : null,
			};
		}
		default: {
			return state;
		}
	}
};

export const getProfileData = profile => ({
	type: GET_PROFILE_DATA,
	profile,
});

export default ProfileReducer;
