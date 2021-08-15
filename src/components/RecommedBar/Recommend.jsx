/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import firebaseApp from '../../service/firebase';
import styles from './Recommend.module.css';

const Recommend = ({ follow, setFollow, myname, name }) => {
	const [profile, setProfile] = useState(null);
	const imgUrl = '/pictures/User.jpg';
	useEffect(() => {
		if (!name) return;
		const ref = firebaseApp.database().ref(`/userImage/${name}`);
		ref.on('value', (snapshot) => {
			const image = snapshot.val();
			image && setProfile(image);
		});
	});
	return (
		<button type='button' className={`${styles.user} followed`}>
			<div className={styles.canvas}>
				<img className={styles.user_img} src={profile || imgUrl} alt='name' />
			</div>
			<div className={styles.user_name}>{name}</div>
		</button>
	);
};

export default Recommend;
