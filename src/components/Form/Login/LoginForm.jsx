import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h1 className={styles.font}>Instagram</h1>
          <input className={styles.input_1} type="email" placeholder="이메일"></input>
          <input className={styles.input_2} type="password" placeholder="비밀번호"></input>
          <button className={styles.login}>로그인</button>
        </form>
        <div className={styles.orContainer}>
          <div className={styles.leftLine}></div>
          <div className={styles.orFont}>또는</div>
          <div className={styles.rightLine}></div>
        </div>
        <button className={styles.naverBtn}>
          <img className={styles.logo} src="https://www.google.com/s2/favicons?domain_url=http://www.naver.com"></img>
          <span className={styles.naver}>Naver로 로그인하기</span>
        </button>
        <div className={styles.searchPw}>
          <a href="https://www.instagram.com/accounts/password/reset/">비밀번호를 잊으셨나요?</a>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <div className={styles.searchSpan}>
            <span>계정이 없으신가요? </span>
          </div>
          <div className={styles.searchLink}>
            <Link to="/accounts/signup">가입하기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
