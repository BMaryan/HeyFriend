export let getPictureBase64 = (e, getProfileData, account) => {
	if (e.target.files.length) {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			getProfileData({ ...account.profile, key: reader.result });
		};
	}
};

export let removeProfilePicture = (getProfileData, account) => {
	getProfileData({ ...account.profile, avatar: null });
};
