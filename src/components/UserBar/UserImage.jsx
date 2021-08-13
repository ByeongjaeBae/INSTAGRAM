import React from 'react';
import styles from './UserImage.module.css';

const UserImage = () => (
  <form className={styles.form}>
    <button className={styles.times} type="button">
      <i className="far fa-times-circle fa-2x" />
    </button>
    <div className={styles.imgBox} />
    <input className={styles.image} type="file" accept="image/*" />
    <button type="button" className={styles.button}>
      이미지 올리기
    </button>
    <textarea
      className={styles.text}
      type="text"
      placeholder="내용을 입력하세요"
    />
    <button className={styles.post} type="submit">
      포스트
    </button>
  </form>
);

export default UserImage;
