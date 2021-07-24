let User;

export const checkUser = () => {
	if (User) return User;
	return null;
};

export const changeUser = (user) => {
	User = user;
};
