import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feed/Feed';
import styles from './FeedList.module.css';
import firebaseApp from '../../service/firebase';

const FeedList = ({ userId, nickname }) => {
	const [post, setPost] = useState({});
	useEffect(() => {
		if (!userId) return;
		const ref = firebaseApp.database().ref(`/post/${nickname}`);
		ref.on('value', (snapshot) => {
			const data = snapshot.val();
			setPost(data);
		});
	}, [nickname, userId]);
	return (
		<div className={styles.container}>
			{post &&
				Object.keys(post)
					.reverse()
					.map((key) => {
						const value = post[key];
						return <Feed userId={userId} key={value.time} data={value} />;
					})}
		</div>
	);
};

FeedList.propTypes = {
	userId: PropTypes.string,
	nickname: PropTypes.string,
};
FeedList.defaultProps = {
	userId: null,
	nickname: null,
};

export default FeedList;
