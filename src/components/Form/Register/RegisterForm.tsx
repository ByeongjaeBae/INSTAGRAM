import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = ({ history }: RouteComponentProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <div className={styles.formContainer}>
          <h1 className={styles.font}>Instagram</h1>
          <button className={styles.naverBtn}>
            <img className={styles.logo} src="/pictures/naver.png"></img>
            <span className={styles.naver}>네이버 아이디로 가입</span>
          </button>
          <div className={styles.orContainer}>
            <div className={styles.leftLine}></div>
            <div className={styles.orFont}>또는</div>
            <div className={styles.rightLine}></div>
          </div>
          <form onSubmit={onSubmit} className={styles.form}>
            <input onChange={onChange} className={styles.input} type="email" placeholder="이메일"></input>
            <input onChange={onChange} className={styles.input} type="text" placeholder="성명"></input>
            <input onChange={onChange} className={styles.input} type="text" placeholder="사용자 이름"></input>
            <input onChange={onChange} className={styles.input} type="password" placeholder="비밀번호"></input>
            <button type="submit" className={styles.login}>
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
              <a href="https://www.instagram.com/accounts/emailsignup/">로그인</a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default withRouter(RegisterForm);
