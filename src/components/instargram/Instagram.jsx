import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Instagram.module.css';
import Header from '../header/header';
import FeedList from '../FeedList/FeedList';
import UserBar from '../UserBar/UserBar';
import RecommendBar from '../RecommedBar/RecommendBar';
import authService from '../../service/auth';
import Post from '../post/Post';
import firebaseApp from '../../service/firebase';

const Instagram = () => {
	const history = useHistory();
	const [post, setPost] = useState(false);
	const [userId, setUserId] = useState({});
	const [nickname, setNickname] = useState();
	const [username, setUsername] = useState();
	const [loading, setLoading] = useState(true);
	const containerRef = useRef(document.getElementsByClassName('box'));
	const [size, setSize] = useState(containerRef.current.offsetLeft);

	const onLogout = useCallback(() => {
		authService.logout();
	}, []);

	const onPost = useCallback(() => {
		setPost(!post);
	}, [post]);

	useEffect(() => {
		authService.onAuthChange((user) => {
			if (!user) {
				history.push('/');
			} else {
				const ref = firebaseApp.database().ref(`/userId/${user.uid}`);
				ref.on('value', (snapshot) => {
					const data = snapshot.val();
					setNickname(data.nickname);
					setUsername(data.username);
				});
				setUserId(user.uid);
			}
		});
	});
	useEffect(() => {
		const Timer = setTimeout(() => {
			setLoading(false);
		}, 500);
		setSize(containerRef.current.offsetLeft);
		window.addEventListener('resize', () => {
			if (containerRef.current) setSize(containerRef.current.offsetLeft);
		});
		return () => clearTimeout(Timer);
	}, [setSize]);
	return (
		<div className={styles.top}>
			<div className={styles.write}>{post && <Post nickname={nickname} />}</div>
			<div className={`${styles.container} ${post && styles.post}`}>
				<Header onLogout={onLogout} onPost={onPost} />
				<article className={styles.article}>
					<div ref={containerRef} className={`${styles.contentContainer} box`}>
						{!loading && (
							<div className={styles.feedContainer}>
								<RecommendBar />
								<FeedList />
							</div>
						)}
						<div className={styles.UserBarContainer}>
							<UserBar
								username={username}
								nickname={nickname}
								userId={userId}
								size={size}
							/>
						</div>
					</div>
				</article>
				{loading && (
					<div className={styles.loading}>
						<img
							className={styles.logo}
							alt='insta'
							src='/pictures/insta.png'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Instagram;
