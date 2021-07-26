import React, { useRef, useState } from 'react';

import styles from './header.module.css';

const Header = () => {
	const inputRef = useRef();
	const [focus, setFocus] = useState(false);
	const [toggle, setToggle] = useState(false);
	const onClick = () => {
		inputRef.current.focus();
		setToggle(!toggle);
		setFocus(true);
	};
	const onBlur = () => {
		if (focus) {
			setFocus(false);
			setToggle(!toggle);
		}
	};
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
					<button type='button' className={`${styles.Icon} ${styles.userIcon}`}>
						<i className='far fa-user-circle fa-2x' />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
