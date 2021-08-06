import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = (props) => {
	const { error, form, onLogin, onSubmit, onChange } = props;
	return (
		<section className={styles.section}>
			<article className={styles.article}>
				<div className={styles.formContainer}>
					<form onSubmit={onSubmit} className={styles.form}>
						<h1 className={styles.font}>Instagram</h1>
						<input
							onChange={onChange}
							name='email'
							className={styles.input}
							type='email'
							placeholder='이메일'
							value={form.email}
						/>
						<input
							onChange={onChange}
							className={styles.input}
							name='password'
							type='password'
							placeholder='비밀번호'
							value={form.password}
						/>
						{error && <div className={styles.passwordCheck}>{error}</div>}
						<button type='submit' className={styles.login}>
							로그인
						</button>
					</form>
					<div className={styles.orContainer}>
						<div className={styles.leftLine} />
						<div className={styles.orFont}>또는</div>
						<div className={styles.rightLine} />
					</div>
					<button onClick={onLogin} type='button' className={styles.naverBtn}>
						<img
							alt='name'
							className={styles.logo}
							src='/pictures/facebook.png'
						/>
						<span className={styles.facebook}>Facebook으로 로그인하기</span>
					</button>
					<div className={styles.searchPw}>비밀번호를 잊으셨나요?</div>
				</div>
				<div className={styles.search}>
					<div className={styles.searchContainer}>
						<div className={styles.searchSpan}>
							<span>계정이 없으신가요? </span>
						</div>
						<div className={styles.searchLink}>
							<Link to='/accounts/signup'>가입하기</Link>
						</div>
					</div>
				</div>
			</article>
		</section>
	);
};

LoginForm.propTypes = {
	form: PropTypes.objectOf(PropTypes.string).isRequired,
	onLogin: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};
LoginForm.defaultProps = {
	error: null,
};

export default React.memo(LoginForm);
