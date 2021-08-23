let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";

let initialState = {
	chats: [
		{
			id: 3,
			messages: [
				{
					id: 1,
					message: "Hello, How do you do",
				},
				{
					id: 2,
					message: "Hello, How do you do",
				},
			],
		},
		{ id: 5, messages: [] },
		{ id: 11, messages: [] },
		{ id: 18, messages: [] },
	],
};

const ChatReducer = (state = initialState, action) => {
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

export default ChatReducer;
