/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import UserList from '../UserList/UserList';
import styles from './UserBar.module.css';

const UserBar = memo(
	({ profile, handleUserImage, size, nickname, username }) => {
		const userRef = useRef(document.getElementsByClassName('userbar'));
		const userImage = './pictures/User.jpg';
		return (
			<div
				style={{ left: `${size + 610 + 20}px` }}
				ref={userRef}
				className={`${styles.container} userbar`}
			>
				<div className={styles.User_box}>
					<button
						onClick={handleUserImage}
						type='button'
						className={styles.User_icon}
					>
						<img alt='origin' src={profile || userImage} />
					</button>
					<div className={styles.User_info}>
						<div className={styles.user_name}>{nickname}</div>
						<div className={styles.name}>{username}</div>
					</div>
				</div>
				<div className={styles.info_container}>
					<div className={styles.info_user}>내가 팔로우한 유저</div>
					<div className={styles.info_all}>모두 보기</div>
				</div>
				<div>
					<UserList nickname={nickname} />
				</div>
				<div className={styles.nav_bar}>
					<nav className={styles.nav}>
						<ul className={styles.ul}>
							<li className={styles.li}>소개</li>
							<li className={styles.li}>도움말</li>
							<li className={styles.li}>홍보 센터</li>
							<li className={styles.li}>api</li>
							<li className={styles.li}>채용 정보</li>
							<li className={styles.li}>개인정보처리방침</li>
							<li className={styles.li}>약관</li>
							<li className={styles.li}>위치</li>
							<li className={styles.li}>인기 계정</li>
							<li className={styles.li}>해쉬태그</li>
							<li className={styles.li}>언어</li>
						</ul>
					</nav>
					<div className={styles.footer}>
						<span className={styles.content}>
							© 2021 INSTAGRAM FROM FACEBOOK
						</span>
					</div>
				</div>
			</div>
		);
	},
);

UserBar.propTypes = {
	size: PropTypes.number,
	nickname: PropTypes.string,
	username: PropTypes.string,
	handleUserImage: PropTypes.func.isRequired,
};
UserBar.defaultProps = {
	size: null,
	nickname: null,
	username: null,
};

export default UserBar;
