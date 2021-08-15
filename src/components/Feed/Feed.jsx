/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import date from '../../service/data';
import firebaseApp from '../../service/firebase';
import BlueDot from '../blue_dot/blue_dot';
import Comment from '../comment/Comment';

import styles from './Feed.module.css';

const Feed = ({ myname, onPost, profileId, loading, data }) => {
	const { imgArr, nickname, text, time, like, userId } = data;
	const pictures = imgArr.length;
	const imgUrl = '/pictures/User.jpg';
	const textRef = useRef();
	const arr = Array.from({ length: pictures }, (v, i) => i);
	const [profile, setProfile] = useState(null);
	const [heart, setHeart] = useState(false);
	const [commentMore, setCommentMore] = useState(false);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [idx, setIdx] = useState(0);
	const [dot, setDot] = useState(false);
	const carouselRef = useRef(null);
	const onChange = (e) => {
		setComment(e.target.value);
	};
	const handleMore = () => {
		setCommentMore(!commentMore);
	};
	const asyncDownload = (ref) =>
		new Promise((resolve) => {
			ref.once('value').then((snapshot) => {
				const commentTime = Date.now();
				const value = snapshot.val();
				const tempArr = value
					? [...value.comments, { comment, time: commentTime }]
					: [{ comment, time: commentTime }];
				setComment('');
				setComments([...tempArr]);
				resolve(tempArr);
			});
		});
	useEffect(() => {
		if (!userId) return;
		const ref = firebaseApp.database().ref(`/userImage/${nickname}`);
		ref.on('value', (snapshot) => {
			const image = snapshot.val();
			image && setProfile(image);
		});
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		const ref = firebaseApp.database().ref(`comment/${nickname}/${time}`);
		const commentArr = await asyncDownload(ref);
		firebaseApp
			.database()
			.ref(`comment/${nickname}/${time}`)
			.set({ comments: commentArr });
	};
	const onDelete = (e) => {
		e.preventDefault();
		firebaseApp.database().ref(`post/${nickname}/${time}`).remove();
		firebaseApp.database().ref(`comment/${nickname}/${time}`).remove();
	};
	const onHeart = (e) => {
		e.preventDefault();
		let newPost;
		const ref = firebaseApp.database().ref(`post/${nickname}/${time}`);
		ref.on('value', (snapshot) => {
			const value = snapshot.val();
			if (!heart) newPost = { ...value, like: [...like, myname] };
			else {
				const newArr = like.filter((name) => name !== myname);
				newPost = { ...value, like: [...newArr] };
			}
		});
		setHeart(!heart);
		firebaseApp.database().ref(`post/${nickname}/${time}`).set(newPost);
	};
	const onComment = (e) => {
		e.preventDefault();
		setCommentMore(!commentMore);
	};
	const onFix = (e) => {
		e.preventDefault();
		onPost(time);
	};
	const onClick = () => {
		textRef.current.value = '';
		textRef.current.focus = true;
	};
	const nextBtn = () => {
		if (idx === pictures - 1) return;
		setIdx(idx + 1);
	};
	const prevBtn = () => {
		if (idx === 0) return;
		setIdx(idx - 1);
	};
	const onDot = () => {
		setDot(!dot);
	};
	useEffect(() => {
		carouselRef.current.style.transform = `translateX(-${idx}00%)`;
	}, [idx]);
	useEffect(() => {
		if (!userId) return;
		const ref = firebaseApp.database().ref(`comment/${nickname}/${time}`);
		ref.once('value', (snapshot) => {
			const value = snapshot.val();
			value && setComments([...value.comments]);
		});
	}, [nickname, time, userId]);
	useEffect(() => {
		const ref = firebaseApp.database().ref(`post/${nickname}/${time}`);
		ref.once('value', (snapshot) => {
			const value = snapshot.val();
			if (value.like.includes(myname)) setHeart(true);
		});
	}, [myname, nickname, time]);
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<button type='button' className={`${styles.img_box} followed`}>
					<img className={styles.user_img} alt='user' src={profile || imgUrl} />
				</button>
				<div className={styles.user}>
					<div className={styles.user_name}>{nickname}</div>
				</div>
				<button onClick={onDot} type='button' className={styles.circle}>
					<div className={styles.dot} />
					<div className={styles.dot} />
					<div className={styles.dot} />
					{dot && (
						<div className={styles.menu}>
							{profileId !== userId && <button type='button'>팔로우</button>}
							{profileId === userId && (
								<button onClick={onFix} type='button'>
									수정
								</button>
							)}
							{profileId === userId && (
								<button onClick={onDelete} type='button'>
									삭제
								</button>
							)}
						</div>
					)}
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
							{loading && <div className={styles.loading} />}
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
						<button onClick={onHeart} type='button' className={styles.i}>
							{!heart && (
								<div>
									<i className='far fa-heart fa-2x' />
								</div>
							)}
							{heart && (
								<div>
									<i style={{ color: 'red' }} className='fas fa-heart fa-2x' />
								</div>
							)}
						</button>
						<button onClick={onComment} type='button' className={styles.i}>
							<i className='far fa-comment fa-2x' />
						</button>
						<button type='button' className={styles.i}>
							<i className='far fa-paper-plane fa-2x' />
						</button>
					</div>
					<div className={styles.column_3}>
						<div className={styles.dot_container}>
							{arr.map((num) => (
								<BlueDot idx={num} index={idx} />
							))}
						</div>
					</div>
					<button type='button' className={`${styles.column_2} ${styles.i}`}>
						<i className='far fa-bookmark fa-2x' />
					</button>
				</div>
				<div className={styles.comment}>
					<div className={styles.like}>{`좋아요 ${like.length - 1}개`}</div>
					<div className={styles.comment_info}>
						<span className={styles.name}>{nickname}</span>
						<span className={styles.content}>{text}</span>
					</div>
					<button
						onClick={handleMore}
						type='button'
						className={styles.comment_more}
					>
						{comments.length > 1 ? `댓글 ${comments.length}개 모두 보기` : ''}
					</button>
					<div className={styles.comment_add}>
						{comments.map((texts, index) => (
							<Comment
								id={index}
								more={commentMore}
								name={nickname}
								text={texts.comment}
								time={texts.time}
							/>
						))}
					</div>
				</div>
				<div className={styles.date}>{date(time)}</div>
			</section>
			<div className={styles.line} />
			<form onSubmit={onSubmit} className={styles.comment_form}>
				<div>
					<i className='far fa-smile fa-2x' />
				</div>
				<textarea
					ref={textRef}
					onChange={onChange}
					value={comment}
					className={`${styles.comment_input} ${
						comment ? styles.comment_done : styles.comment_none
					}`}
					autoComplete='off'
					autoCorrect='off'
					placeholder='댓글 달기...'
				/>
				<button onClick={onClick} className={styles.comment_btn} type='submit'>
					게시
				</button>
			</form>
		</div>
	);
};

export default React.memo(Feed);
