import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.css';

const Post = ({ nickname }) => {
	const inputRef = useRef();
	const [imgArr, setImgArr] = useState([]);
	const onClick = (e) => {
		e.preventDefault();
		inputRef.current.click();
	};
	const onChange = (e) => {
		console.log(e.currentTarget.files);
		setImgArr(e.currentTarget.files);
		console.log(imgArr);
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
