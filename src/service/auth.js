const Users = [
	{
		email: 'qudwo09@naver.com',
		username: 'qudwo09',
		nickname: 'qudwo',
		password: 'qoqudwo10!',
	},
	{
		email: 'qoqudwo09@naver.com',
		username: 'qoqudwo09',
		nickname: 'qoqudwo',
		password: 'qoqudwo10!',
	},
];

// eslint-disable-next-line import/no-mutable-exports

export const userRegister = (user) => {
	const exists = Users.find((element) => {
		if (element.email === user.email) return true;
		if (element.username === user.username) return true;
		return false;
	});
	if (!exists) {
		Users.concat(user);
		return true;
	}
	return false;
};

export const userFind = (user) => {
	const exists = Users.find((element) => {
		if (element.email === user.email) {
			if (element.password === user.password) return true;
		}
		return false;
	});
	if (exists) {
		return exists.username;
	}
	return null;
};
