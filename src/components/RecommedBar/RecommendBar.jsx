/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import firebaseApp from '../../service/firebase';
import Recommend from './Recommend';
import styles from './RecommendBar.module.css';

const RecommendBar = ({ nickname }) => {
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
		<div
			className={`${styles.container} ${names ? styles.visible : styles.none}`}
		>
			{names &&
				names.map((name) => (
					<Recommend
						follow={follow}
						setFollow={setFollow}
						myname={nickname}
						name={name}
					/>
				))}
		</div>
	);
};

export default RecommendBar;
