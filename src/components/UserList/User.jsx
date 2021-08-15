/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import firebaseApp from '../../service/firebase';
import styles from './User.module.css';

const User = ({ follow, setFollow, name, myname }) => {
	const [profile, setProfile] = useState(null);
	const imgUrl = '/pictures/User.jpg';
	const handleFollow = (e) => {
		e.preventDefault();
		setFollow(!follow);
		const ref = firebaseApp.database().ref(`follow/${myname}`);
		ref.once('value', (snapshot) => {
			const data = snapshot.val();
			const arr = data.filter((val) => val !== name);
			ref.set([...arr]);
		});
	};
	useEffect(() => {
		if (!name) return;
		const ref = firebaseApp.database().ref(`/userImage/${name}`);
		ref.on('value', (snapshot) => {
			const image = snapshot.val();
			image && setProfile(image);
		});
	});
	return (
		<div className={styles.user}>
			<div className={styles.imgContainer}>
				<img className={styles.img} src={profile || imgUrl} alt='pic' />
			</div>
			<div className={styles.info_container}>
				<div className={styles.username}>{name}</div>
				<div className={styles.info}>회원님이 팔로중입니다</div>
			</div>
			<button type='button' onClick={handleFollow} className={styles.follow}>
				언팔로우
			</button>
		</div>
	);
};

export default User;
