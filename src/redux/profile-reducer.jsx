let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";

let initialState = {
	profile: {
		id: null,
		name: null,
		surname: null,
		img: null,
		status: null,
		aboutMe: null,
		posts: [],
	},
	// profile: null,
};

const ProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE_DATA: {
			return {
				...state,
				profile: action.profile ? { ...state.profile, ...action.profile } : null,
			};
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				img: action.img,
				likes: action.likes,
				comments: action.comments,
			};

			return {
				...state,
				profile: { ...state.profile, posts: [...state.profile.posts, { ...newPost }] },
				// posts: { ...state.profile.posts, newPost },
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

export const setProfilePosts = (img, likes, comments) => ({
	type: SET_PROFILE_POSTS,
	img,
	likes,
	comments,
});

export default ProfileReducer;
