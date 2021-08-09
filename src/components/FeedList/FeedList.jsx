import React from 'react';
import Feed from '../Feed/Feed';
import styles from './FeedList.module.css';

const FeedList = () => (
	<div className={styles.container}>
		<Feed key={Date.now()} />
	</div>
);

export default FeedList;
