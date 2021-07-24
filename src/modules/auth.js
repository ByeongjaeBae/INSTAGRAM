import { userFind, userRegister } from '../service/auth';

/* eslint-disable no-unused-vars */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const RegisterCheck = (user) => {
	if (userRegister(user)) return REGISTER_SUCCESS;
	return REGISTER_FAILURE;
};

const LoginCheck = (user) => {
	if (userFind(user)) return LOGIN_SUCCESS;
	return LOGIN_FAILURE;
};

export const changeField = ({ form, key, value }) => ({
	type: CHANGE_FIELD,
	data: {
		form,
		key,
		value,
	},
});

export const initializeForm = (form) => ({
	type: INITIALIZE_FORM,
	data: form,
});

export const register = ({ email, username, nickname, password }) => {
	const data = {
		email,
		username,
		nickname,
		password,
	};
	const type = RegisterCheck(data);
	if (type === REGISTER_SUCCESS) {
		return {
			type,
			data,
			auth: true,
		};
	}
	return {
		type,
		error: 'Register Error',
		auth: false,
	};
};

export const login = ({ email, password }) => {
	const data = {
		email,
		password,
	};
	const type = LoginCheck(data);
	if (type === LOGIN_SUCCESS) {
		return {
			type,
			data,
			auth: true,
		};
	}
	return {
		type,
		error: 'Login Error',
		auth: false,
	};
};
const initialState = {
	register: {
		email: '',
		username: '',
		nickname: '',
		password: '',
		passwordConfirm: '',
	},
	login: {
		email: '',
		password: '',
	},
	registerData: {
		email: '',
		username: '',
		nickname: '',
		password: '',
	},
	loginData: {
		email: '',
		password: '',
	},
	auth: null,
	authError: null,
};

function Auth(state = initialState, action) {
	const { type, data, auth, error } = action;
	switch (type) {
		case CHANGE_FIELD: {
			const obj = { ...state[data.form] };
			const newObj = {
				...obj,
				[data.key]: data.value,
			};
			return { ...state, [data.form]: newObj };
		}
		case INITIALIZE_FORM: {
			return {
				...state,
				[data.form]: initialState[data.form],
				authError: null,
				registerData: initialState.registerData,
				loginData: initialState.loginData,
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				authError: null,
				registerData: data,
				auth,
			};
		}
		case REGISTER_FAILURE: {
			return {
				...state,
				authError: error,
				auth,
			};
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				authError: null,
				loginData: data,
				auth,
			};
		}
		case LOGIN_FAILURE: {
			return {
				...state,
				authError: error,
				auth,
			};
		}
		default:
			return state;
	}
}

export default Auth;
