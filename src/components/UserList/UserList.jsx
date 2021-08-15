/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import firebaseApp from '../../service/firebase';
import User from './User';
import styles from './UserList.module.css';

const UserList = ({ nickname }) => {
	const [names, setNames] = useState([]);
	const [follow, setFollow] = useState(true);
	useEffect(() => {
		firebaseApp
			.database()
			.ref(`/follow/${nickname}`)
			.on('value', (snapshot) => {
				const data = snapshot.val();
				data && setNames([...data]);
				!data && setNames(null);
			});
	}, [nickname, follow]);
	return (
		<div className={styles.container}>
			{names &&
				names.map((name) => (
					<User
						follow={follow}
						setFollow={setFollow}
						myname={nickname}
						name={name}
					/>
				))}
		</div>
	);
};

export default UserList;
