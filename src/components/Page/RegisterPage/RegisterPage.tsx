import React from 'react';
import Footer from '../../Footer/Footer';
import RegisterForm from '../../Form/Register/RegisterForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <section className={styles.section}>
      <article className={styles.container}>
        <RegisterForm></RegisterForm>
      </article>
      <Footer></Footer>
    </section>
  );
};

export default RegisterPage;
