import avatar from "./assets/images/avatar1.jpg";
import coverPhoto from "./assets/images/coverPhoto6.jpg";
import post1 from "./assets/images/post1.jpg";
import post2 from "./assets/images/post2.jpg";
import post3 from "./assets/images/post3.jpg";
import post4 from "./assets/images/post4.jpg";

export const account1 = {
	id: 1,
	profile: {
		name: "Christopher",
		surname: "Pierce",
		phone_or_email: "ChristopherPierce@gmail.com",
		password: "12345678",
		coverPhoto: coverPhoto,
		avatar: avatar,
		status: "Everyone is wrong. Admits a mistake - worthy. Apologizes - courageous. Restores the relationship - strong.",
		aboutMe: "Based in Chicago. I love playing tennis and loud music. I have a persistent enthusiasm to create new things.",
		posts: [
			{
				comments: [],
				dateCreated: "01.01.01",
				description: `Rest after active brain activity does not mean that you do not need to do anything else, you just need to change things: physical work is not only nice, but also a fairly healthy rest after mental work. Konstantin Ushinsky`,
				id: "1OBgGE4mh9jE",
				likes: [],
				photo: post1,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description:
					"“Turn your large-scale thoughts into large-scale actions as soon as possible. Don't let false excuses slow you down. Excuses are symptoms of fear. ”",
				id: "1O3gGF4fhr6M",
				likes: [],
				photo: post2,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: "The pinnacle of ideality is simplicity.",
				id: "1OB6G84mhDhjO",
				likes: [],
				photo: post3,
			},
			{
				comments: [],
				dateCreated: "01.01.01",
				description: "Everyone sympathizes with the misfortunes of their friends, and only a few rejoice in their success. Oscar Wilde",
				id: "1OK6g8jmJHhGv",
				likes: [],
				photo: post4,
			},
		],
	},
};
