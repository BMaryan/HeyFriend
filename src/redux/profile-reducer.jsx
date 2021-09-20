let GET_PROFILE_DATA = "social_network/profilePage/GET_PROFILE_DATA";
let SET_PROFILE_POSTS = "social_network/profilePage/SET_PROFILE_POSTS";
let SET_PROFILE_CHATS = "social_network/profilePage/SET_PROFILE_CHATS";
let ADD_PROFILE = "social_network/chatPage/ADD_PROFILE";
let GET_AUTHORIZATION_ID = "social_network/chatPage/GET_AUTHORIZATION_ID";
let GET_PARAMS_ID = "social_network/chatPage/GET_PARAMS_ID";
let SET_PROFILES = "social_network/chatPage/SET_PROFILES";

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
		chats: [],
	},
	authorizationId: null,
	paramsId: null,
};

const ProfileReducer = (state = initialState, action) => {
	let myProfile =
		state.profiles && state.profiles.length
			? state.profiles.find(profile => (profile && state.authorizationId && !state.paramsId ? profile.id === state.authorizationId : undefined))
			: undefined;
	let otherProfile =
		state.profiles && state.profiles.length
			? state.profiles.find(profile => (profile && state.paramsId && !state.authorizationId ? profile.id === state.paramsId : undefined))
			: undefined;
	let arrayNoCurrentProfiles =
		state.profiles && state.profiles.length
			? state.profiles.filter(profile => (profile && action.profile ? profile.id !== action.profile.id : undefined))
			: undefined;

	switch (action.type) {
		case SET_PROFILES: {
			return {
				...state,
				profiles: action.profiles ? [...action.profiles] : [],
			};
		}
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
					chats: [],
				},
			};

			return {
				...state,
				profiles: state.profiles && newProfile && newProfile.id ? [...state.profiles, { ...newProfile }] : [...state.profiles],
			};
		}
		case GET_PROFILE_DATA: {
			return {
				...state,
				profile: action.profile ? { ...state.profile, ...action.profile } : null,
				profiles:
					myProfile && !otherProfile
						? [...arrayNoCurrentProfiles, { ...myProfile, profile: { ...myProfile.profile, ...action.profile } }]
						: otherProfile && !myProfile
						? [...arrayNoCurrentProfiles, { ...otherProfile, profile: { ...otherProfile.profile, ...action.profile } }]
						: state.profiles && state.profiles.length
						? state.profiles.map(profile => ({ ...profile }))
						: [],
			};
		}
		case SET_PROFILE_POSTS: {
			let newPost = {
				id: state.profile.posts ? (state.profile.posts.length !== 0 ? state.profile.posts.length + 2 : 2) : 1,
				img: action.img,
				likes: action.likes,
				comments: action.comments,
			};
			let arrayProfiles = state.profiles
				? state.profiles.filter(profile => (myProfile ? profile.id !== myProfile.profile.id : undefined))
				: undefined;

			return {
				...state,
				profile: { ...state.profile, posts: state.profile.posts && newPost ? [...state.profile.posts, { ...newPost }] : [] },
				profiles: arrayProfiles
					? [
							...arrayProfiles,
							{
								...myProfile,
								profile: { ...myProfile.profile, posts: myProfile ? [...myProfile.profile.posts, { ...newPost }] : [] },
							},
					  ]
					: [
							{
								...myProfile,
								profile: { ...myProfile.profile, posts: myProfile ? [...myProfile.profile.posts, { ...newPost }] : [] },
							},
					  ],
			};
		}
		case SET_PROFILE_CHATS: {
			let arrayProfiles = state.profiles
				? state.profiles.filter(profile => (myProfile ? profile.id !== myProfile.profile.id : undefined))
				: undefined;
			console.log("otherProfile", otherProfile);

			return {
				...state,
				profiles: myProfile
					? arrayProfiles && myProfile
						? [
								...arrayProfiles,
								{
									...myProfile,
									profile: { ...myProfile.profile, chats: myProfile ? action.chats.map(chat => ({ ...chat })) : [] },
								},
						  ]
						: myProfile
						? {
								...myProfile,
								profile: { ...myProfile.profile, chats: myProfile ? action.chats.map(chat => ({ ...chat })) : [] },
						  }
						: undefined
					: state.profiles.map(profile => ({ ...profile })),
			};
		}
		case GET_AUTHORIZATION_ID: {
			return {
				...state,
				authorizationId: action.id,
			};
		}
		case GET_PARAMS_ID: {
			return {
				...state,
				paramsId: action.id,
			};
		}
		default: {
			return state;
		}
	}
};

export const setProfiles = profiles => ({
	type: SET_PROFILES,
	profiles,
});

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

export const setProfileChats = chats => ({
	type: SET_PROFILE_CHATS,
	chats,
});

export const getAuthorizationId = id => ({
	type: GET_AUTHORIZATION_ID,
	id,
});

export const getParamsId = id => ({
	type: GET_PARAMS_ID,
	id,
});

export default ProfileReducer;
