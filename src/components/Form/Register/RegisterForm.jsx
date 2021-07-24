import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ onChange, form, onSubmit, error }) => (
	<section className={styles.section}>
		<article className={styles.article}>
			<div className={styles.formContainer}>
				<h1 className={styles.font}>Instagram</h1>
				<button type='button' className={styles.naverBtn}>
					<img className={styles.logo} src='/pictures/naver.png' alt='name' />
					<span className={styles.naver}>네이버 아이디로 가입</span>
				</button>
				<div className={styles.orContainer}>
					<div className={styles.leftLine} />
					<div className={styles.orFont}>또는</div>
					<div className={styles.rightLine} />
				</div>
				<form onSubmit={onSubmit} className={styles.form}>
					<input
						onChange={onChange}
						className={styles.input}
						type='email'
						name='email'
						value={form.email}
						placeholder='이메일'
					/>
					<input
						onChange={onChange}
						className={styles.input}
						type='text'
						name='username'
						value={form.username}
						placeholder='성명'
					/>
					<input
						onChange={onChange}
						className={styles.input}
						type='text'
						name='nickname'
						value={form.nickname}
						placeholder='사용자 이름'
					/>
					<input
						onChange={onChange}
						className={styles.input}
						type='password'
						name='password'
						value={form.passwrod}
						placeholder='비밀번호'
					/>
					<input
						onChange={onChange}
						className={styles.input}
						type='password'
						name='passwordConfirm'
						value={form.passwordConfirm}
						placeholder='비밀번호 확인'
					/>
					{error && <div className={styles.passwordCheck}>{error}</div>}
					<button type='submit' className={styles.login}>
						가입
					</button>
				</form>
			</div>
			<div className={styles.search}>
				<div className={styles.searchContainer}>
					<div className={styles.searchSpan}>
						<span>계정이 있으신가요? </span>
					</div>
					<div className={styles.searchLink}>
						<Link to='./login'>로그인</Link>
					</div>
				</div>
			</div>
		</article>
	</section>
);

RegisterForm.propTypes = {
	form: PropTypes.objectOf(PropTypes.string).isRequired,
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};
RegisterForm.defaultProps = {
	error: null,
};

export default React.memo(withRouter(RegisterForm));
