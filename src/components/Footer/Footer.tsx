import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_column1}>
        <div>소개</div>
        <div>블로그</div>
        <div>채용정보</div>
        <div>도움말</div>
        <div>API</div>
        <div>개인정보처리방침</div>
        <div>약관</div>
        <div>인기 계정</div>
        <div>해시태그</div>
        <div>위치</div>
      </div>
      <div className={styles.footer_column2}>
        <div>한국어</div>
        <div>© 2021 Instagram from Facebook</div>
      </div>
    </footer>
  );
};

export default Footer;
