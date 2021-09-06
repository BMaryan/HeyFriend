let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";
let ADD_PROFILE = "social_network/chatPage/ADD_PROFILE";

let initialState = {
	profiles: [],
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
		case ADD_PROFILE: {
			let newProfile = {
				id: action.id,
				profile: {
					id: null,
					name: null,
					surname: null,
					img: null,
					status: null,
					aboutMe: null,
					posts: [],
				},
			};

			return {
				...state,
				profiles: [...state.profiles, { ...newProfile }],
			};
		}
		case GET_PROFILE_DATA: {
			return {
				...state,
				profile: action.profile ? { ...state.profile, ...action.profile } : null,
				profiles:
					state.profiles &&
					state.profiles.map(item => {
						console.log(item);
						console.log(action.profile);
						console.log(item && action.profile && item.id === action.profile.id);
						return item && action.profile && item.id === action.profile.id
							? { ...item, profile: { ...item.profile, ...action.profile } }
							: { ...item, profile: { ...item.profile } };
					}),
				// profiles: state.profiles.find(item =>
				// 	action.profile && action.profile.id && item.id === action.profile.id
				// 		? { ...item, profile: { ...item.profile, ...action.profile } }
				// 		: undefined
				// ),
				// { ...item, profile: { ...item.profile }
			};
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				id: state.profile.posts ? state.profile.posts.length + 1 : null,
				img: action.img,
				likes: action.likes,
				comments: action.comments,
			};

			return {
				...state,
				profile: { ...state.profile, posts: state.profile.posts && newPost ? [...state.profile.posts, { ...newPost }] : [] },
				profiles:
					state.profiles &&
					state.profiles.map(item => {
						console.log(item);
						console.log(item.profile);
						console.log(item && item.profile && item.id === item.profile.id);
						return {
							...item,
							profile: {
								...item.profile,
								posts:
									item && item.profile && item.id === item.profile.id
										? item && item.profile && [...item.profile.posts, { ...newPost }]
										: [],
							},
						};
					}),
			};
		}
		default: {
			return state;
		}
	}
};

export const addProfile = id => ({
	type: ADD_PROFILE,
	id,
});

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
