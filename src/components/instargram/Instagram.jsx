/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
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
import UserImage from '../UserBar/UserImage';

const Instagram = () => {
	const history = useHistory();
	const [post, setPost] = useState(false);
	const [userImage, setUserImage] = useState(false);
	const [profile, setProfile] = useState(null);
	const [follow, setFollow] = useState(false);
	const [userId, setUserId] = useState();
	const [nickname, setNickname] = useState();
	const [username, setUsername] = useState();
	const [loading, setLoading] = useState(true);
	const [fix, setFix] = useState(null);
	const [menu, setMenu] = useState(false);
	const containerRef = useRef(document.getElementsByClassName('box'));
	const [size, setSize] = useState(containerRef.current.offsetLeft);

	const onLoading = () => {
		setLoading(false);
	};
	const handleFollow = (value) => {
		setFollow(value);
	};

	const onMenu = () => {
		setMenu(!menu);
	};
	const handleUserImage = () => {
		setUserImage(!userImage);
	};
	const onLogout = useCallback(() => {
		authService.logout();
	}, []);

	const onPost = useCallback(
		(time) => {
			setPost(!post);
			if (Number.isInteger(time)) setFix(time);
			else setFix(null);
		},
		[post],
	);

	useEffect(() => {
		if (!userId) return;
		const ref = firebaseApp.database().ref(`/userImage/${nickname}`);
		ref.on('value', (snapshot) => {
			const data = snapshot.val();
			data && setProfile(data);
			!data && setProfile(null);
			onLoading();
		});
	});

	useEffect(() => {
		authService.onAuthChange((user) => {
			if (!user) {
				history.push('/');
			} else {
				setUserId(user.uid);
				const ref = firebaseApp.database().ref(`/userId/${user.uid}`);
				ref.on('value', (snapshot) => {
					const data = snapshot.val();
					setNickname(data.nickname);
					setUsername(data.username);
				});
			}
		});
	});
	useEffect(() => {
		setSize(containerRef.current.offsetLeft);
		window.addEventListener('resize', () => {
			if (containerRef.current) setSize(containerRef.current.offsetLeft);
		});
	}, [setSize]);
	return (
		<div className={styles.top}>
			<div className={styles.write}>
				{post && (
					<Post
						fix={fix}
						nickname={nickname}
						userId={userId}
						onMenu={onMenu}
						onPost={onPost}
					/>
				)}
				{userImage && (
					<UserImage nickname={nickname} handleUserImage={handleUserImage} />
				)}
			</div>
			<div
				className={`${styles.container} ${(post || userImage) && styles.post}`}
			>
				<Header
					follow={follow}
					onFollow={handleFollow}
					myname={nickname}
					onMenu={onMenu}
					menu={menu}
					onLogout={onLogout}
					onPost={onPost}
				/>
				<article className={styles.article}>
					<div ref={containerRef} className={`${styles.contentContainer} box`}>
						{!loading && (
							<div className={styles.feedContainer}>
								<RecommendBar nickname={nickname} />
								<FeedList
									follow={follow}
									onPost={onPost}
									nickname={nickname}
									userId={userId}
								/>
							</div>
						)}
						<div className={styles.UserBarContainer}>
							<UserBar
								profile={profile}
								handleUserImage={handleUserImage}
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
