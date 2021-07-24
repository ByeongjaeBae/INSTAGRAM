import React from 'react';
import Login from '../../../containers/auth/Login';
import Footer from '../../Footer/Footer';
import styles from './LoginPage.module.css';

const LoginPage = () => (
	<section className={styles.section}>
		<article className={styles.container}>
			<Login />
		</article>
		<Footer />
	</section>
);

export default LoginPage;
