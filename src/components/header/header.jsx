import React, { useCallback, useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';

import styles from './header.module.css';

const Header = memo(({ onLogout, onPost }) => {
	const inputRef = useRef();
	const [focus, setFocus] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [menu, setMenu] = useState(false);
	const onClick = useCallback(() => {
		inputRef.current.focus();
		setToggle(!toggle);
		setFocus(true);
	}, [toggle]);
	const onBlur = useCallback(() => {
		if (focus) {
			setFocus(false);
			setToggle(!toggle);
		}
	}, [toggle, focus]);
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.title}>
					<span>Instagram</span>
				</div>
				<div className={styles.searchBar}>
					<div className={styles.input}>
						<input
							ref={inputRef}
							onBlur={onBlur}
							type='text'
							className={styles.search}
							placeholder='검색'
						/>
						<div className={styles.searchIcon}>
							<i className='fas fa-search fa-xs' />
						</div>
						<div className={styles.timer}>
							<i className='fas fa-times-circle' />
						</div>
					</div>
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
				</div>
				<div className={styles.nav}>
					<button type='button' className={`${styles.Icon} ${styles.homeIcon}`}>
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
							onClick={() => setMenu(!menu)}
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
});

Header.propTypes = {
	onLogout: PropTypes.func.isRequired,
	onPost: PropTypes.func.isRequired,
};

export default Header;
