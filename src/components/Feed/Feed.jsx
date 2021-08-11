/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import BlueDot from '../blue_dot/blue_dot';

import styles from './Feed.module.css';

function date(time) {
	const data = (Date.now() - time) * 2.7777777777778e-7;
	const day = data / 24;
	if (data < 24) {
		return '오늘';
	}
	return `${day}일전`;
}

const Feed = ({ data }) => {
	const { imgArr, nickname, text, time } = data;
	const pictures = imgArr.length;
	const arr = Array.from({ length: pictures }, (v, i) => i);
	const [comment, setComment] = useState('');
	const [idx, setIdx] = useState(0);
	const carouselRef = useRef(null);
	const onChange = (e) => {
		setComment(e.target.value);
	};
	const nextBtn = () => {
		if (idx === pictures - 1) return;
		setIdx(idx + 1);
	};
	const prevBtn = () => {
		if (idx === 0) return;
		setIdx(idx - 1);
	};
	useEffect(() => {
		carouselRef.current.style.transform = `translateX(-${idx}00%)`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idx]);
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<button type='button' className={`${styles.img_box} followed`}>
					<img
						className={styles.user_img}
						alt='user'
						src='/pictures/User.jpg'
					/>
				</button>
				<div className={styles.user}>
					<div className={styles.user_name}>{nickname}</div>
					<div className={styles.user_info}>Gangneung</div>
				</div>
				<button type='button' className={styles.circle}>
					<div className={styles.dot} />
					<div className={styles.dot} />
					<div className={styles.dot} />
				</button>
			</div>
			<div>
				<div className={styles.img_container}>
					{idx !== pictures - 1 && (
						<button
							onClick={nextBtn}
							className={`${styles.arrow_btn} ${styles.next_btn}`}
							type='submit'
						>
							<div className={styles.next_arrow} />
						</button>
					)}
					{idx !== 0 && (
						<button
							onClick={prevBtn}
							className={`${styles.arrow_btn} ${styles.prev_btn}`}
							type='submit'
						>
							<div className={styles.prev_arrow} />
						</button>
					)}
					<div className={styles.carousel_wrapper}>
						<div ref={carouselRef} className={styles.carousel}>
							{imgArr &&
								imgArr.map((img) => (
									<img className={styles.feed_image} alt='user' src={img} />
								))}
						</div>
					</div>
				</div>
			</div>
			<section className={styles.section}>
				<div className={styles.icon}>
					<div className={styles.column_1}>
						<div className={styles.i}>
							<i className='far fa-heart fa-2x' />
						</div>
						<div className={styles.i}>
							<i className='far fa-comment fa-2x' />
						</div>
						<div className={styles.i}>
							<i className='far fa-paper-plane fa-2x' />
						</div>
					</div>
					<div className={styles.column_3}>
						<div className={styles.dot_container}>
							{arr.map((num) => (
								<BlueDot idx={num} index={idx} />
							))}
						</div>
					</div>
					<div className={styles.column_2}>
						<i className='far fa-bookmark fa-2x' />
					</div>
				</div>
				<div className={styles.comment}>
					<div className={styles.like}>좋아요 818개</div>
					<div className={styles.comment_info}>
						<span className={styles.name}>{nickname}</span>
						<span className={styles.content}>{text}</span>
					</div>
					<div className={styles.comment_more}>댓글 10개 모두 보기</div>
					<div className={styles.comment_add}>
						<div className={styles.comment_info}>
							<span className={styles.name}>donggenius</span>
							<span className={styles.content}>전화받았어요</span>
						</div>
						<div className={styles.comment_icon}>
							<i className='far fa-heart' />
						</div>
					</div>
				</div>
				<div className={styles.date}>{date(time)}</div>
			</section>
			<div className={styles.line} />
			<form className={styles.comment_form}>
				<div>
					<i className='far fa-smile fa-2x' />
				</div>
				<textarea
					onChange={onChange}
					value={comment}
					className={`${styles.comment_input} ${
						comment ? styles.comment_done : styles.comment_none
					}`}
					autoComplete='off'
					autoCorrect='off'
					placeholder='댓글 달기...'
				/>
				<button className={styles.comment_btn} type='submit'>
					게시
				</button>
			</form>
		</div>
	);
};

export default Feed;
