import React from 'react';
import styles from './Instagram.module.css';
import Header from '../header/header';
import FeedList from '../FeedList/FeedList';
import UserBar from '../UserBar/UserBar';
import RecommendBar from '../RecommedBar/RecommendBar';

const Instagram = () => (
	<div className={styles.container}>
		<Header />
		<article className={styles.article}>
			<div className={styles.contentContainer}>
				<div className={styles.feedContainer}>
					<RecommendBar />
					<FeedList />
				</div>
				<div className={styles.UserBarContainer}>
					<UserBar />
				</div>
			</div>
		</article>
	</div>
);

export default Instagram;
