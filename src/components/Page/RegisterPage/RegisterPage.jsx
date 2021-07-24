import React from 'react';
import Register from '../../../containers/auth/Register';
import Footer from '../../Footer/Footer';
import styles from './RegisterPage.module.css';

const RegisterPage = () => (
	<section className={styles.section}>
		<article className={styles.container}>
			<Register />
		</article>
		<Footer />
	</section>
);

export default RegisterPage;
