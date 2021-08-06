import authService from '../service/auth';
import firebaseApp from '../service/firebase';

/* eslint-disable no-unused-vars */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const RegisterCheck = async (user) =>
	// eslint-disable-next-line no-async-promise-executor
	new Promise(async (resolve, reject) => {
		try {
			const promise = await authService.emailRegister(user);
			const data = {
				username: promise.username,
				nickname: promise.nickname,
			};
			if (promise) {
				await firebaseApp.database().ref(`userId/${promise.uid}`).set(data);
				resolve(REGISTER_SUCCESS);
			}
		} catch (e) {
			reject(e);
		}
	});

const LoginCheck = async (user) =>
	// eslint-disable-next-line no-async-promise-executor
	new Promise(async (resolve, reject) => {
		try {
			const promise = await authService.emailLogin(user);
			if (promise) {
				resolve(promise);
			}
		} catch (e) {
			reject(e);
		}
	});

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

export const register = () =>
	async function Fn(dispatch, getState) {
		try {
			const data = { ...getState().Auth.register };
			const type = await RegisterCheck(data);
			if (type === REGISTER_SUCCESS) {
				return dispatch({
					type,
					data,
					auth: true,
				});
			}
		} catch (e) {
			console.error(e);
			return dispatch({
				type: REGISTER_FAILURE,
				error: 'Register Error',
				auth: false,
			});
		}
	};

export const login = () =>
	async function Fn(dispatch, getState) {
		try {
			const data = { ...getState().Auth.login };
			const user = await LoginCheck(data);
			return dispatch({
				typeL: LOGIN_SUCCESS,
				user,
				auth: true,
			});
		} catch (e) {
			console.error(e);
			return dispatch({
				type: LOGIN_FAILURE,
				error: 'Login Error',
				auth: false,
			});
		}
	};

export const facebookLogin = () =>
	async function Fn(dispatch) {
		try {
			const user = await authService.facebookLogin();
			return dispatch({
				type: LOGIN_SUCCESS,
				auth: true,
				user,
			});
		} catch (e) {
			console.error(e);
			return dispatch({
				type: LOGIN_FAILURE,
				auth: false,
			});
		}
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
	nickname: '',
	username: '',
	auth: null,
	authError: null,
};

function Auth(state = initialState, action) {
	const { type, data, auth, error, user } = action;
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
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				authError: null,
				nickname: data.nickname,
				username: data.username,
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
				nickname: user.nickname,
				username: user.username,
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
