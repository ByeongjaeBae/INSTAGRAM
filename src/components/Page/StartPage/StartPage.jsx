/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import Login from '../../../containers/auth/Login';
import Footer from '../../Footer/Footer';
import styles from './StartPage.module.css';

function getToggle(toggle, num) {
	if (num < 5 && toggle[num]) {
		return styles.first;
	}
	if (num >= 5 && toggle[num]) {
		return styles.second;
	}
	return '';
}

const StartPage = () => {
	const [toggle, setToggle] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false,
	});
	const imgArr = [];
	imgArr[0] = '/pictures/1.jpg';
	imgArr[1] = '/pictures/2.jpg';
	imgArr[2] = '/pictures/3.jpg';
	imgArr[3] = '/pictures/4.jpg';
	const setImg = useCallback((num) => {
		let checkNum;
		if (num === 1) checkNum = 8;
		else checkNum = num + 3;
		setToggle({ ...toggle, [num]: true, [checkNum]: true });
	}, []);
	useEffect(() => {
		let num = 0;
		if (num > 3) num = 1;
		else num += 1;
		setImg(num);
		setInterval(() => {
			if (num > 3) num = 1;
			else num += 1;
			setImg(num);
		}, 3000);
	}, [setImg]);
	return (
		<section className={styles.section}>
			<article className={styles.container}>
				<div className={styles.column_1}>
					<div className={styles.imgContainer}>
						<img
							src='/pictures/1.jpg'
							className={`${styles.img} ${getToggle(toggle, 1)} ${getToggle(
								toggle,
								5,
							)}`}
							alt='name'
						/>
						<img
							src='/pictures/2.jpg'
							className={`${styles.img} ${getToggle(toggle, 2)} ${getToggle(
								toggle,
								6,
							)}`}
							alt='name'
						/>
						<img
							src='/pictures/3.jpg'
							className={`${styles.img} ${getToggle(toggle, 3)} ${getToggle(
								toggle,
								7,
							)}`}
							alt='name'
						/>
						<img
							src='/pictures/4.jpg'
							className={`${styles.img} ${getToggle(toggle, 4)} ${getToggle(
								toggle,
								8,
							)}`}
							alt='name'
						/>
					</div>
				</div>
				<div className={styles.column_2}>
					<Login />
				</div>
			</article>
			<Footer />
		</section>
	);
};

export default StartPage;
