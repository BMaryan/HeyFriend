export let getUniqueGeneratedIdPost = props => {
	let result = props.account.id + "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;

	for (let i = 0; i < props.length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	let searchTheSameId = props.account && props.account.profile.posts ? props.account.profile.posts.find(post => post.id === result) : undefined;

	if (!searchTheSameId) {
		console.log(typeof result);
		return result;
	} else {
		return result + props.account.profile.posts.length;
	}
};

export let getPictureBase64 = props => {
	if (props.event.target.files.length) {
		let file = props.event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			props.method(props.account && props.key ? { ...props.account.profile, [props.key]: reader.result } : reader.result);
		};
	}
};

export let removePicture = props => {
	props.method({ ...props.account.profile, [props.key]: null });
};
