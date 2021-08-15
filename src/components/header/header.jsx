/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './header.module.css';
import firebaseApp from '../../service/firebase';

const Header = memo(
	({ myname, menu, onMenu, onLogout, onPost, follow, onFollow }) => {
		const inputRef = useRef();
		const following = '팔로우';
		const unfollowing = '언팔로우';
		const [toggle, setToggle] = useState(false);
		const [name, setName] = useState('');
		const [nickname, setNickname] = useState('');
		const [names, setNames] = useState([]);
		const [nameObj, setNameObj] = useState({});
		const [userImage, setUserImage] = useState();
		const onInit = () => {
			setToggle(!toggle);
			inputRef.current.value = '';
			setName('');
		};
		const onChange = (e) => {
			setName(e.currentTarget.value);
		};
		const onClick = useCallback(() => {
			inputRef.current.focus();
			setToggle(!toggle);
		}, [toggle]);

		const handleFollow = (e) => {
			e.preventDefault();
			onFollow(!follow);
			const ref = firebaseApp.database().ref(`follow/${myname}`);
			ref.once('value', (snapshot) => {
				const data = snapshot.val();
				if (follow) {
					const arr = data.filter((val) => val !== name);
					ref.set([...arr]);
				} else if (!data) ref.set([name]);
				else ref.set([...data, name]);
			});
		};

		useEffect(() => {
			const ref = firebaseApp.database().ref(`nickname/`);
			ref.once('value', (snapshot) => {
				const data = snapshot.val();
				setNames(Object.keys(data));
				setNameObj({ ...data });
			});
			if (names.includes(name)) {
				const reff = firebaseApp.database().ref(`userImage/${name}`);
				reff.once('value', (snapshot) => {
					setUserImage(snapshot.val());
					setNickname(nameObj[name].nickname);
				});
				const refff = firebaseApp.database().ref(`follow/${myname}`);
				refff.on('value', (snapshot) => {
					const data = snapshot.val();
					if (data) {
						if (data.includes(name)) onFollow(true);
						else onFollow(false);
					} else {
						onFollow(false);
					}
				});
			}
		}, [name]);
		return (
			<header className={styles.header}>
				<div className={styles.container}>
					<div className={styles.title}>
						<span>Instagram</span>
					</div>
					<div className={styles.searchBar}>
						<form className={styles.input}>
							<input
								ref={inputRef}
								onChange={onChange}
								type='text'
								value={name}
								className={styles.search}
								placeholder='검색'
							/>
							<button onClick={onInit} type='button' className={styles.timer}>
								<i className='fas fa-times-circle' />
							</button>
						</form>
						{!toggle && (
							<button
								onClick={onClick}
								type='button'
								className={styles.searchDiv}
							>
								<span>
									<i className='fas fa-search' />
								</span>
								<span className={styles.font}>검색</span>
							</button>
						)}
						{names.includes(name) && (
							<div className={styles.searchList}>
								<div className={styles.image}>
									<img
										className={styles.userImage}
										src={userImage}
										alt='user'
									/>
								</div>
								<div className={styles.name}>
									<div className={styles.username}>{name}</div>
									<div className={styles.nickname}>{nickname}</div>
								</div>
								{myname !== name && (
									<button
										onClick={handleFollow}
										className={`${follow ? styles.unfollow : styles.follow}`}
										type='button'
									>
										{follow ? unfollowing : following}
									</button>
								)}
							</div>
						)}
					</div>
					<div className={styles.nav}>
						<button
							type='button'
							className={`${styles.Icon} ${styles.homeIcon}`}
						>
							<i className='fas fa-home fa-2x' />
						</button>
						<button
							type='button'
							className={`${styles.Icon} ${styles.planeIcon}`}
						>
							<i className='far fa-paper-plane fa-2x' />
						</button>
						<button
							type='button'
							className={`${styles.Icon} ${styles.compassIcon}`}
						>
							<i className='far fa-compass fa-2x' />
						</button>
						<button
							type='button'
							className={`${styles.Icon} ${styles.heartIcon}`}
						>
							<i className='far fa-heart fa-2x' />
						</button>
						<div className={styles.button}>
							<button
								type='button'
								onClick={onMenu}
								className={`${styles.Icon} ${styles.userIcon}`}
							>
								<i className='far fa-user-circle fa-2x' />
							</button>
							{menu && (
								<div className={styles.menuCon}>
									<div className={styles.menu}>
										<div className={styles.rhombus} />
										<div className={styles.menubar}>
											<button
												onClick={onPost}
												type='button'
												className={styles.post}
											>
												포스트 작성
											</button>
											<button onClick={onLogout} type='button'>
												로그아웃
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		);
	},
);

Header.propTypes = {
	myname: PropTypes.string.isRequired,
	menu: PropTypes.bool.isRequired,
	onMenu: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
	onPost: PropTypes.func.isRequired,
	follow: PropTypes.bool.isRequired,
	onFollow: PropTypes.func.isRequired,
};

export default Header;
