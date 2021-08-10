/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.css';

const Post = ({ nickname }) => {
	const inputRef = useRef();
	const [imgBase64, setImgBase64] = useState(''); // 파일 base64
	const [imgFile, setImgFile] = useState(null);
	const onClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};
	const onChange = (e) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			// 2. 읽기가 완료되면 아래코드가 실행됩니다.
			const base64 = reader.result;
			if (base64) {
				setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
			}
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
			setImgFile(e.target.files[0]); // 파일 상태 업데이트
		}
	};
	return (
		<form className={styles.form}>
			<input
				ref={inputRef}
				multiple='multiple'
				className={styles.image}
				type='file'
				accept='image/*'
				onChange={onChange}
			/>
			<button onClick={onClick} className={styles.button} type='button'>
				{nickname}
			</button>
			<textarea
				className={styles.text}
				type='text'
				placeholder='내용을 입력하세요'
			/>
		</form>
	);
};

Post.propTypes = {
	nickname: PropTypes.string.isRequired,
};

export default Post;
