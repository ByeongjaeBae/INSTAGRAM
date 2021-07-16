import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import LoginForm from '../../Form/Login/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section>
      <div className={styles.column_2}>
        <LoginForm></LoginForm>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default LoginPage;
