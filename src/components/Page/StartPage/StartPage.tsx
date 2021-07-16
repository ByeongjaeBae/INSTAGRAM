import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import LoginForm from '../../Form/Login/LoginForm';
import styles from './StartPage.module.css';

const StartPage = () => {
  const [toggle, setToggle] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
  });
  const imgArr: string[] = [];
  imgArr[0] = '/pictures/1.jpg';
  imgArr[1] = '/pictures/2.jpg';
  imgArr[2] = '/pictures/3.jpg';
  imgArr[3] = '/pictures/4.jpg';
  const setImg = (num: number) => {
    let num_;
    if (num === 1) num_ = 8;
    else num_ = num + 3;
    setToggle({ ...toggle, [num]: true, [num_]: true });
  };
  useEffect(() => {
    let num = 0;
    if (num > 3) num = 1;
    else num++;
    setImg(num);
    setInterval(() => {
      if (num > 3) num = 1;
      else num++;
      setImg(num);
    }, 3000);
  }, []);
  return (
    <section>
      <article className={styles.container}>
        <div className={styles.column_1}>
          <div className={styles.imgContainer}>
            <img
              src="/pictures/1.jpg"
              className={`${styles.img} ${getToggle(toggle, 1)} ${getToggle(toggle, 5)}`}
              alt="name"
            ></img>
            <img
              src="/pictures/2.jpg"
              className={`${styles.img} ${getToggle(toggle, 2)} ${getToggle(toggle, 6)}`}
              alt="name"
            ></img>
            <img
              src="/pictures/3.jpg"
              className={`${styles.img} ${getToggle(toggle, 3)} ${getToggle(toggle, 7)}`}
              alt="name"
            ></img>
            <img
              src="/pictures/4.jpg"
              className={`${styles.img} ${getToggle(toggle, 4)} ${getToggle(toggle, 8)}`}
              alt="name"
            ></img>
          </div>
        </div>
        <div className={styles.column_2}>
          <LoginForm></LoginForm>
        </div>
      </article>
      <Footer></Footer>
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getToggle(toggle: any, num: number): string {
  if (num < 5 && toggle[num]) {
    return styles.first;
  } else if (num >= 5 && toggle[num]) {
    return styles.second;
  }
  return '';
}

export default StartPage;
