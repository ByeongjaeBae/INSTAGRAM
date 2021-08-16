/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feed/Feed';
import styles from './FeedList.module.css';
import firebaseApp from '../../service/firebase';

const FeedList = ({ onPost, userId, nickname, follow }) => {
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);
	const [profileId, setProfileId] = useState(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (!userId) return;
		setProfileId(userId);
		const ref = firebaseApp.database().ref(`/post`);
		ref.on('value', (snapshot) => {
			const data = snapshot.val();
			let arr;
			if (data) {
				arr = Object.keys(data);
				firebaseApp
					.database()
					.ref(`/follow/${nickname}`)
					.on('value', (snap) => {
						const postArr = [];
						let names;
						if (snap.val()) names = [...snap.val(), nickname];
						else names = [nickname];
						setPost([]);
						names.forEach((name) => {
							if (arr.includes(name)) {
								Object.keys(data[name]).forEach((value) => {
									postArr.push(data[name][value]);
									postArr.sort((a, b) => a.time - b.time);
									setPost([...postArr]);
								});
							}
						});
					});
			}
		});
	}, [nickname, userId, follow]);
	return (
		<div className={styles.container}>
			<div className={styles.container}>
				{post &&
					Object.keys(post)
						.reverse()
						.map((key) => {
							const value = post[key];
							return (
								<Feed
									myname={nickname}
									onPost={onPost}
									profileId={profileId}
									setLoading={setLoading}
									loading={loading}
									key={value.time}
									data={value}
								/>
							);
						})}
			</div>
		</div>
	);
};

FeedList.propTypes = {
	onPost: PropTypes.func.isRequired,
	userId: PropTypes.string,
	nickname: PropTypes.string,
	follow: PropTypes.bool.isRequired,
};
FeedList.defaultProps = {
	userId: null,
	nickname: null,
};

export default FeedList;
