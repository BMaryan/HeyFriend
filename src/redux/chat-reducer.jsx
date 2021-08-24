let ADD_MESSAGE = "social_network/chatPage/ADD_MESSAGE";

let initialState = {
	chats: [
		{
			id: 3,
			messages: [
				{
					id: 1,
					userId: 3,
					message: "Hello, How do you do",
				},
				{
					id: 2,
					userId: 3,
					message: "3",
				},
				{
					id: 3,
					userId: 4,
					message: "3",
				},
			],
		},
		{
			id: 5,
			messages: [
				{
					id: 1,
					userId: 5,
					message: "Good",
				},
				{
					id: 2,
					userId: 7,
					message: "7",
				},
			],
		},
		{
			id: 11,
			messages: [
				{
					id: 1,
					userId: 11,
					message: "Hello",
				},
				{
					id: 2,
					userId: 11,
					message: "11",
				},
			],
		},
		{
			id: 18,
			messages: [
				{
					id: 1,
					userId: 18,
					message: "Green",
				},
				{
					id: 2,
					userId: 18,
					message: "HEllo",
				},
				{
					id: 3,
					userId: 18,
					message: "18",
				},
			],
		},
	],
};

const ChatReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE: {
			let newMessage = {
				id: action.id,
				userId: action.userId,
				message: action.message,
			};

			return {
				...state,
				chats: state.chats.map(chat =>
					chat.id === action.id ? { ...chat, messages: [...chat.messages, newMessage] } : { ...chat, messages: [...chat.messages] }
				),
			};
		}
		default: {
			return state;
		}
	}
};

export const addMessage = (id, userId, message) => ({
	type: ADD_MESSAGE,
	id,
	userId,
	message,
});

export default ChatReducer;
