import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Instagram.module.css';
import Header from '../header/header';
import FeedList from '../FeedList/FeedList';
import UserBar from '../UserBar/UserBar';
import RecommendBar from '../RecommedBar/RecommendBar';
import authService from '../../service/auth';

const Instagram = () => {
	const history = useHistory();
	const { nickname } = useSelector((state) => ({
		nickname: state.Auth.nickname,
	}));
	const [userId, setUserId] = useState({});
	const [loading, setLoading] = useState(true);
	const containerRef = useRef(document.getElementsByClassName('box'));
	const [size, setSize] = useState(containerRef.current.offsetLeft);

	useEffect(() => {
		authService.onAuthChange((user) => {
			if (!user) {
				history.push('/');
			} else {
				setUserId(user.uid);
			}
		});
	});
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 500);
		setSize(containerRef.current.offsetLeft);
		window.addEventListener('resize', () => {
			setSize(containerRef.current.offsetLeft);
		});
	}, []);
	return (
		<div className={styles.container}>
			<Header />
			<article className={styles.article}>
				<div ref={containerRef} className={`${styles.contentContainer} box`}>
					{!loading && (
						<div className={styles.feedContainer}>
							<RecommendBar />
							<FeedList />
						</div>
					)}
					<div className={styles.UserBarContainer}>
						<UserBar nickname={nickname} userId={userId} size={size} />
					</div>
				</div>
			</article>
			{loading && (
				<div className={styles.loading}>
					<img className={styles.logo} alt='insta' src='/pictures/insta.png' />
				</div>
			)}
		</div>
	);
};

export default Instagram;
