/* eslint-disable react/prop-types */
import React from 'react';
import date from '../../service/data';
import styles from './Comment.module.css';

const Comment = ({ id, name, text, time, more }) => (
	<div
		className={`${styles.comment_add} ${
			id >= 1 && !more ? styles.nonVisible : styles.visible
		}`}
	>
		<div className={styles.comment_info}>
			<span className={styles.name}>{name}</span>
			<span className={styles.content}>{text}</span>
		</div>
		<div className={styles.comment_icon}>
			<div className={styles.time}>{date(time)}</div>
			<i className='far fa-heart' />
		</div>
	</div>
);

export default Comment;
