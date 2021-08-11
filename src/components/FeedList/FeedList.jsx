import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feed/Feed';
import styles from './FeedList.module.css';
import firebaseApp from '../../service/firebase';

const FeedList = ({ userId }) => {
	const [post, setPost] = useState({});
	useEffect(() => {
		if (!userId) return;
		const ref = firebaseApp.database().ref(`/post/${userId}`);
		ref.on('value', (snapshot) => {
			const data = snapshot.val();
			setPost(data);
		});
	}, [userId]);
	return (
		<div className={styles.container}>
			{post &&
				Object.keys(post).map((key) => {
					const value = post[key];
					return <Feed key={value.time} data={value} />;
				})}
		</div>
	);
};

FeedList.propTypes = {
	userId: PropTypes.string,
};
FeedList.defaultProps = {
	userId: null,
};

export default FeedList;
