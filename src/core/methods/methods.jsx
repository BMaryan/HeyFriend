export let getPictureBase64 = (e, getProfileData, account, key) => {
	if (e.target.files.length) {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			getProfileData({ ...account.profile, [key]: reader.result });
		};
	}
};

export let removePicture = (getProfileData, account, key) => {
	getProfileData({ ...account.profile, [key]: null });
};
