/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import LoginForm from '../../components/Form/Login/LoginForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check, setTempUser } from '../../modules/user';

const Login = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector((state) => ({
		form: state.Auth.login,
		auth: state.Auth.auth,
		authError: state.Auth.authError,
		user: state.User.user,
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
	const onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = form;
		dispatch(login({ email, password }));
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
			dispatch(setTempUser('login', form));
			dispatch(check());
		}
	}, [auth, authError, dispatch]);
	useEffect(() => {
		if (user) {
			history.push('/instagram');
		}
	}, [history]);
	return (
		<LoginForm
			error={error}
			form={form}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

Login.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
};

export default React.memo(withRouter(Login));
