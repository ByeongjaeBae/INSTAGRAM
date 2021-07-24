import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
	<footer>
		<div className={styles.footer_column1}>
			<div className={styles.div}>소개</div>
			<div className={styles.div}>블로그</div>
			<div className={styles.div}>채용정보</div>
			<div className={styles.div}>도움말</div>
			<div className={styles.div}>API</div>
			<div className={styles.div}>개인정보처리방침</div>
			<div className={styles.div}>약관</div>
			<div className={styles.div}>인기 계정</div>
			<div className={styles.div}>해시태그</div>
			<div className={styles.div}>위치</div>
		</div>
		<div className={styles.footer_column2}>
			<div>한국어</div>
			<div>© 2021 Instagram from Facebook</div>
		</div>
	</footer>
);

export default React.memo(Footer);
