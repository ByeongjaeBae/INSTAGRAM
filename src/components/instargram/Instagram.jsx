import React, { useEffect, useRef, useState } from 'react';
import styles from './Instagram.module.css';
import Header from '../header/header';
import FeedList from '../FeedList/FeedList';
import UserBar from '../UserBar/UserBar';
import RecommendBar from '../RecommedBar/RecommendBar';

const Instagram = () => {
	const [loading, setLoading] = useState(true);
	const containerRef = useRef(document.getElementsByClassName('box'));
	const [size, setSize] = useState(containerRef.current.offsetLeft);
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
						<UserBar size={size} />
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
