/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mine from 'mime-types';
import styles from './Post.module.css';
import firebaseApp from '../../service/firebase';

const Post = ({ nickname, userId, onPost, onMenu }) => {
	const inputRef = useRef();
	const [imgUrl, setImgUrl] = useState([]);
	const [imgFile, setImgFile] = useState([]);
	const [text, setText] = useState('');
	const onText = (e) => {
		setText(e.currentTarget.value);
	};
	const onClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};
	function asyncUpload(url, img, idx) {
		return new Promise((resolve, reject) => {
			firebaseApp
				.storage()
				.ref()
				.child(url)
				.put(img, { contentType: mine.lookup(img.name) })
				.then(() => resolve(idx))
				.catch((e) => reject(e));
		});
	}
	function asyncDownload(url) {
		return new Promise((resolve, reject) => {
			firebaseApp
				.storage()
				.ref()
				.child(url)
				.getDownloadURL()
				.then((file) => {
					resolve(file);
				})
				.catch((e) => reject(e));
		});
	}
	const onSubmit = async (e) => {
		e.preventDefault();
		onPost();
		const time = Date.now();
		let imgArr = [];
		let data = {
			userId,
			time,
			postId: time,
			nickname,
			text,
			imgArr,
		};
		const promises = imgFile.map((img, idx) =>
			asyncUpload(`user/${userId}/${time}/${idx}`, img, idx),
		);
		await Promise.all(promises).then(async (idx) => {
			const subPromises = idx.map((index) =>
				asyncDownload(`user/${userId}/${time}/${index}`, imgArr),
			);
			const files = await Promise.all(subPromises);
			imgArr = [...imgArr, ...files];
			data = { ...data, imgArr };
		});
		await firebaseApp.database().ref(`post/${userId}/${time}`).set(data);
	};
	const onBtn = () => {
		onMenu();
	};

	const onChange = (e) => {
		e.preventDefault();
		const fileArr = e.target.files;
		const fileURLs = [];
		setImgFile([...fileArr]);
		for (let i = 0; i < fileArr.length; i += 1) {
			const file = fileArr[i];
			const reader = new FileReader();
			reader.onloadend = () => {
				fileURLs[i] = reader.result;
				setImgUrl([...fileURLs]);
			};
			if (file) reader.readAsDataURL(file);
		}
	};
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<button className={styles.times} type='button' onClick={onPost}>
				<i className='far fa-times-circle fa-2x' />
			</button>
			<div className={styles.imgBox}>
				{imgUrl.map((img) => (
					<img className={styles.img} src={img} alt='images' />
				))}
			</div>
			<input
				ref={inputRef}
				multiple='multiple'
				className={styles.image}
				type='file'
				accept='image/*'
				onChange={onChange}
			/>
			<button type='button' onClick={onClick} className={styles.button}>
				이미지 올리기
			</button>
			<textarea
				className={styles.text}
				type='text'
				value={text}
				placeholder='내용을 입력하세요'
				onChange={onText}
			/>
			<button className={styles.post} onClick={onBtn} type='submit'>
				포스트
			</button>
		</form>
	);
};

Post.propTypes = {
	userId: PropTypes.string.isRequired,
	nickname: PropTypes.string.isRequired,
	onPost: PropTypes.func.isRequired,
	onMenu: PropTypes.func.isRequired,
};

export default Post;
