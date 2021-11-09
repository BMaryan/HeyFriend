import avatar from "./assets/images/avatar2.jpg";
import coverPhoto from "./assets/images/coverPhoto7.jpg";
import post1 from "./assets/images/post1.jpg";
import post2 from "./assets/images/post2.jpg";
import post3 from "./assets/images/post3.jpg";

export const account2 = {
	id: 2,
	profile: {
		name: "Marie",
		surname: "Bennett",
		phone_or_email: "MarieBennett@gmail.com",
		password: "12345678",
		coverPhoto: coverPhoto,
		avatar: avatar,
		status: "Do not confuse laziness with rest!",
		aboutMe: "Currently living in Colorado. Lover of art, languages and travelling.",
		posts: [
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `We need to be able to rest, especially from your thoughts.`,
				id: "2FBgSbLhh94B",
				likes: [],
				photo: post1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `A friend is the best you can have and the best you can be.`,
				id: "2vSgbLhLn21",
				likes: [],
				photo: post2,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `Don't want to go to work in the morning? Open Forbes magazine and find your last name there. Didn't find it? Then go to work!`,
				id: "2vegVLhAslP",
				likes: [],
				photo: post3,
			},
		],
	},
};
