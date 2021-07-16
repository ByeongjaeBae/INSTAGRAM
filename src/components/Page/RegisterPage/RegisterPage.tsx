import React from 'react';
import RegisterForm from '../../Form/Register/RegisterForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default RegisterPage;
