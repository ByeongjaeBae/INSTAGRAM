/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import RegisterForm from '../../components/Form/Register/RegisterForm';
import {
	changeField,
	facebookLogin,
	initializeForm,
	register,
} from '../../modules/auth';
import authService from '../../service/auth';

const Register = ({ history }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { form, auth, authError } = useSelector((state) => ({
		form: state.Auth.register,
		auth: state.Auth.auth,
		authError: state.Auth.authError,
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
	const onLogin = () => {
		dispatch(facebookLogin());
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
		if (password.length < 7) {
			setError('비밀번호는 6글자보다 길어야 합니다.');
			return;
		}
		authService
			.checkUser(nickname)
			.then(() => {
				dispatch(register());
			})
			.catch(() => {
				setError('동일한 닉네임이 존재합니다');
			});
	};
	useEffect(() => {
		dispatch(initializeForm('register'));
	}, [dispatch]);
	useEffect(() => {
		if (authError) {
			setError('회원가입 오류입니다.');
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
		<RegisterForm
			error={error}
			onChange={onChange}
			onLoign={onLogin}
			onSubmit={onSubmit}
			form={form}
		/>
	);
};

Register.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
};

export default React.memo(withRouter(Register));
