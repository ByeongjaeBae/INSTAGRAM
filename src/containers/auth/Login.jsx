/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import LoginForm from '../../components/Form/Login/LoginForm';
import {
	changeField,
	facebookLogin,
	initializeForm,
	login,
} from '../../modules/auth';
import authService from '../../service/auth';

const Login = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError } = useSelector((state) => ({
		form: state.Auth.login,
		auth: state.Auth.auth,
		authError: state.Auth.authError,
	}));
	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'login',
				key: name,
				value,
			}),
		);
	};
	const onLogin = () => {
		dispatch(facebookLogin());
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login());
	};
	useEffect(() => {
		dispatch(initializeForm('login'));
	}, [dispatch]);
	useEffect(() => {
		if (authError) {
			setError('로그인 실패');
			return;
		}
		if (auth) {
			history.push('/instagram');
		}
	}, [auth, authError, dispatch, history]);
	useEffect(() => {
		authService.onAuthChange((user) => {
			if (user) {
				history.push('/instagram');
			}
		});
	}, []);
	return (
		<LoginForm
			error={error}
			form={form}
			onLogin={onLogin}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

Login.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
};

export default React.memo(withRouter(Login));
