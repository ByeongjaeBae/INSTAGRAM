import React from 'react';
import UserList from '../UserList/UserList';
import styles from './UserBar.module.css';

const UserBar = () => (
	<div className={styles.container}>
		<div className={styles.User_box}>
			<div className={styles.User_icon}>
				<img alt='origin' src='./pictures/User.jpg' />
			</div>
			<div className={styles.User_info}>
				<div className={styles.user_name}>BaeByungJae</div>
				<div className={styles.name}>배병재</div>
			</div>
			<div className={styles.User_tmi}>전환</div>
		</div>
		<div className={styles.info_container}>
			<div className={styles.info_user}>회원님을 위한 추천</div>
			<div className={styles.info_all}>모두 보기</div>
		</div>
		<div>
			<UserList />
		</div>
		<footer />
	</div>
);

export default UserBar;
