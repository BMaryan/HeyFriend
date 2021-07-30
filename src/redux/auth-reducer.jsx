let SET_USER_SIGN_IN = "social_network/auth/SET_USER_SIGN_IN";
let SET_USER_SIGN_UP = "social_network/auth/SET_USER_SIGN_UP";
let SET_USERS = "social_network/auth/SET_USERS";
let CHECK_AUTHORIZATION = "social_network/auth/CHECK_AUTHORIZATION";

let initialState = {
	users: [],
	userSignIn: {
		phone_or_email: null,
		password: null,
		rememberMe: null,
	},
	userSignUp: {
		id: null,
		name: null,
		surname: null,
		phone_or_email: null,
		password: null,
	},
	profileAuthorizationData: {},
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_SIGN_IN: {
			return {
				...state,
				userSignIn: { ...action.data },
			};
		}
		case SET_USER_SIGN_UP: {
			return {
				...state,
				userSignUp: { id: state.users.length + 1, ...action.data },
			};
		}
		case SET_USERS: {
			return {
				...state,
				...state.users,
				users: action.users ? [...action.users] : [],
			};
		}
		case CHECK_AUTHORIZATION: {
			return {
				...state,
				...state.profileAuthorizationData,
				// profileAuthorizationData:
			};
		}
		default: {
			return state;
		}
	}
};

export const setUserSignIn = ({ phone_or_email, password, rememberMe = false }) => ({
	type: SET_USER_SIGN_IN,
	data: { phone_or_email, password, rememberMe },
});

export const setUserSignUp = ({ name, surname, phone_or_email, password }) => ({
	type: SET_USER_SIGN_UP,
	data: { name, surname, phone_or_email, password },
});

export const setUsers = users => ({
	type: SET_USERS,
	users,
});

export const checkAuthorization = (users, userSignIn) => ({
	type: CHECK_AUTHORIZATION,
	users,
	userSignIn,
});

export default AuthReducer;
