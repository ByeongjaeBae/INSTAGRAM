import React from 'react';
import styles from './RecommendBar.module.css';

const RecommendBar = () => (
	<div className={styles.container}>
		<div className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src='/pictures/User.jpg' alt='name' />
			</div>
			<div className={styles.user_name}>b1223s</div>
		</div>
		<div className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src='/pictures/User.jpg' alt='name' />
			</div>
		</div>
		<div className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src='/pictures/User.jpg' alt='name' />
			</div>
		</div>
		<div className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src='/pictures/User.jpg' alt='name' />
			</div>
		</div>
		<div className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src='/pictures/User.jpg' alt='name' />
			</div>
		</div>
	</div>
);

export default RecommendBar;
