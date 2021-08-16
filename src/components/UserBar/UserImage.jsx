/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import firebaseApp from '../../service/firebase';
import styles from './UserImage.module.css';

const UserImage = ({ handleUserImage, nickname }) => {
	const [img, setImg] = useState(null);
	const [imgUrl, setImgUrl] = useState(null);
	const inputRef = useRef(null);
	const onChange = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const options = {
			maxSizeKB: 100,
			maxWidthOrHeight: 60,
		};
		try {
			const compressedFile = await imageCompression(file, options);
			setImg(compressedFile);

			// resize된 이미지의 url을 받아 fileUrl에 저장
			const promise = imageCompression.getDataUrlFromFile(compressedFile);
			promise.then((result) => {
				setImgUrl(result);
			});
		} catch (error) {
			console.log(error);
		}
	};
	const onClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		handleUserImage();
		await firebaseApp.storage().ref().child(`/userImage/${nickname}`).put(img);
		const data = await firebaseApp
			.storage()
			.ref()
			.child(`/userImage/${nickname}`)
			.getDownloadURL();
		firebaseApp.database().ref(`/userImage/${nickname}`).set(data);
	};
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<button onClick={handleUserImage} className={styles.times} type='button'>
				<i className='far fa-times-circle fa-2x' />
			</button>
			<div className={styles.imgBox}>
				{imgUrl && <img className={styles.img} src={imgUrl} alt='images' />}
			</div>
			<div className={styles.imgBox} />
			<input
				ref={inputRef}
				className={styles.image}
				type='file'
				accept='image/*'
				onChange={onChange}
			/>
			<button type='button' onClick={onClick} className={styles.button}>
				프로필 이미지 업로드
			</button>
			<button className={styles.post} type='submit'>
				사진 적용
			</button>
		</form>
	);
};

export default UserImage;
