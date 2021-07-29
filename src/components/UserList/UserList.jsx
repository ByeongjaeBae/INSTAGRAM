import React from 'react';
import styles from './UserList.module.css';

const UserList = () => (
  <div className={styles.container}>
    <div className={styles.user}>
      <div className={`${styles.imgContainer} followed`}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
    <div className={styles.user}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src="./pictures/clouds.jpg" alt="pic" />
      </div>
      <div className={styles.info_container}>
        <div className={styles.username}>hash_sihwan</div>
        <div className={styles.info}>회원님을 팔로우합니다</div>
      </div>
      <div className={styles.follow}>팔로우</div>
    </div>
  </div>
);

export default UserList;
