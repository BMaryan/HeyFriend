import avatar from "./assets/images/avatar3.jpg";
import coverPhoto from "./assets/images/coverPhoto16.jpg";
import post1 from "./assets/images/post1.jpg";
import post2 from "./assets/images/post2.jpg";
import post3 from "./assets/images/post3.jpg";

export const account3 = {
	id: 3,
	profile: {
		name: "Account3",
		surname: "Account3",
		phone_or_email: "account3@gmail.com",
		password: "12345678",
		coverPhoto: coverPhoto,
		avatar: avatar,
		status: "Two things fly by the sea especially fast - time and money.",
		aboutMe:
			"I think it is better to dream of beauty than to live nearby and not feel… He is the people of the Black Sea coast, because they do not notice the sea or heat, for them it is life.",
		posts: [
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `Time, like the sea, unties any knots. Iris Murdoch`,
				id: "3cBgОyLhh04M",
				likes: [],
				photo: post1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `The sea attracts people with its magical beauty and mysterious grandeur.`,
				id: "3eSgbLSLn2f",
				likes: [],
				photo: post2,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `No matter how, no matter where - the sea will always be waiting for you. Alessandro Barrico.`,
				id: "3KegVdh3sls",
				likes: [],
				photo: post3,
			},
		],
	},
};
