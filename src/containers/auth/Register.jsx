/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import RegisterForm from '../../components/Form/Register/RegisterForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import { check, setTempUser } from '../../modules/user';

const Register = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError, user } = useSelector((state) => ({
		form: state.Auth.register,
		auth: state.Auth.auth,
		authError: state.Auth.authError,
		user: state.User.user,
	}));
	const onChange = (e) => {
		const { value, name } = e.target;
		dispatch(
			changeField({
				form: 'register',
				key: name,
				value,
			}),
		);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const { email, username, password, passwordConfirm, nickname } = form;
		if ([username, email, password, passwordConfirm, nickname].includes('')) {
			setError('빈 칸을 모두 입력하세요.');
			return;
		}
		if (password !== passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			// eslint-disable-next-line no-useless-return
			return;
		}
		dispatch(register({ email, username, nickname, password }));
	};
	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);
	useEffect(() => {
		if (authError) {
			setError('이미 존재하는 게정명입니다.');
			return;
		}
		if (auth) {
			dispatch(setTempUser('register', form.username));
			dispatch(check());
		}
	}, [auth, authError, dispatch]);

	useEffect(() => {
		if (user) {
			history.push('/instagram');
		}
	}, [history, user]);
	return (
		<RegisterForm
			error={error}
			onChange={onChange}
			onSubmit={onSubmit}
			form={form}
		/>
	);
};

Register.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
};

export default React.memo(withRouter(Register));
