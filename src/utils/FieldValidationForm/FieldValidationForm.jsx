import styles from "./FieldValidationForm.module.css";

export const required = value => {
	if (value) {
		return undefined;
	} else {
		return <div className={styles.required}>This field is required</div>;
	}
};

export const maxLengthCreator = maxLength => value => value && value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined;

export const validateAuthorizationUserCreator = (users, userSignIn) => value => {
	let foundUser;
	if (users) {
		foundUser = users.find(item => item.phone_or_email === userSignIn.phone_or_email);

		if (foundUser && value) {
			console.log("GOOD phone_or_email");
			return undefined;
		} else {
			console.log("ERROR phone_or_email");
			return "No such user!";
		}
	}
};

export const validateFindTheSameUserCreator = users => value => {
	let foundUser;
	if (users) {
		foundUser = users.find(item => item.phone_or_email === value);
	}

	if (!foundUser) {
		return undefined;
	} else {
		return "The same user";
	}
};

export const validateFirstAndLastNameCreator = nameField => value => {
	if (value && !/^[a-z ,.'-]+$/i.test(value)) {
		return `Enter ${nameField} name`;
	} else {
		return undefined;
	}
};

export const validatePhoneNumberAndEmail = value => {
	if (value && !/^([0-9][0-9]{9})$/i.test(value) && value && !/^[\w-.]+@[a-zA-Z]+\.[a-zA-Z]+$/i.test(value)) {
		return "The email or mobile number you entered isn’t connected to an account.";
	} else {
		return undefined;
	}
};

export const validatePassword = value => {
	if (value && !/^[\w.]{8,}$/i.test(value)) {
		return "Sorry, your password was incorrect. Please double-check your password.";
	} else {
		return undefined;
	}
};
