import React, { useState } from 'react';

import styles from './Feed.module.css';

const Feed = () => {
  const [comment, setComment] = useState('');
  const onChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button type="button" className={`${styles.img_box} followed`}>
          <img
            className={styles.user_img}
            alt="user"
            src="/pictures/User.jpg"
          />
        </button>
        <div className={styles.user}>
          <div className={styles.user_name}>dongeenius</div>
          <div className={styles.user_info}>Gangneung</div>
        </div>
        <button type="button" className={styles.circle}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </button>
      </div>
      <div>
        <div>
          <img
            className={styles.feed_image}
            alt="user"
            src="/pictures/cruise.jpg"
          />
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.icon}>
          <div className={styles.column_1}>
            <div className={styles.i}>
              <i className="far fa-heart fa-2x" />
            </div>
            <div className={styles.i}>
              <i className="far fa-comment fa-2x" />
            </div>
            <div className={styles.i}>
              <i className="far fa-paper-plane fa-2x" />
            </div>
          </div>
          <div className={styles.column_2}>
            <i className="far fa-bookmark fa-2x" />
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.like}>좋아요 818개</div>
          <div className={styles.comment_info}>
            <span className={styles.name}>donggenius</span>
            <span className={styles.content}>전화받았어요</span>
          </div>
          <div className={styles.comment_more}>댓글 10개 모두 보기</div>
          <div className={styles.comment_add}>
            <div className={styles.comment_info}>
              <span className={styles.name}>donggenius</span>
              <span className={styles.content}>전화받았어요</span>
            </div>
            <div className={styles.comment_icon}>
              <i className="far fa-heart" />
            </div>
          </div>
        </div>
        <div className={styles.date}>4일 전</div>
      </section>
      <div className={styles.line} />
      <form className={styles.comment_form}>
        <div>
          <i className="far fa-smile fa-2x" />
        </div>
        <textarea
          onChange={onChange}
          value={comment}
          className={`${styles.comment_input} ${
            comment ? styles.comment_done : styles.comment_none
          }`}
          autoComplete="off"
          autoCorrect="off"
          placeholder="댓글 달기..."
        />
        <button className={styles.comment_btn} type="submit">
          게시
        </button>
      </form>
    </div>
  );
};

export default Feed;
