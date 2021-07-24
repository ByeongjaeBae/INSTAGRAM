import { userFind } from '../service/auth';
import { changeUser, checkUser } from '../service/user';

const SET_TEMP_USER = '/user/SET_TEMP_USER';
const CHECK_SUCCESS = '/user/CHECK_SUCCESS';
const CHECK_FAILURE = '/user/CHECK_FAILURE';

const funcCheck = () => {
	if (checkUser) return CHECK_SUCCESS;
	return CHECK_FAILURE;
};

export const setTempUser = (form, user) => {
	let data;
	if (form === 'login') {
		data = userFind(user);
	} else data = user;
	changeUser(data);
	return { type: SET_TEMP_USER, data };
};

export const check = () => {
	const type = funcCheck();
	const user = checkUser();
	if (type === CHECK_SUCCESS) {
		return {
			type,
			user,
		};
	}
	return {
		type,
		error: 'Check Error',
	};
};

const initialState = {
	user: '',
	checkError: '',
};

function User(state = initialState, action) {
	const { type, data, user, error } = action;
	switch (type) {
		case SET_TEMP_USER:
			return {
				...state,
				user: data,
			};
		case CHECK_SUCCESS:
			return {
				...state,
				user,
				checkError: null,
			};
		case CHECK_FAILURE:
			return {
				...state,
				user: null,
				checkError: error,
			};
		default:
			return state;
	}
}

export default User;
