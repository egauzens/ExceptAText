const re = /^([1-9][0-9]{9})$/;

export default (value) => {
	return re.test(value) === false
		? "Invalid phone number, must be 10 digits"
		: "";
};
