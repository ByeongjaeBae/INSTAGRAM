import React, { useRef, useState } from 'react';

import styles from './header.module.css';

const Header = () => {
  const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    inputRef.current.focus();
    setToggle(!toggle);
    setFocus(true);
  };
  const onBlur = () => {
    if (focus) {
      setFocus(false);
      setToggle(!toggle);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Instagram</span>
        </div>
        <div className={styles.searchBar}>
          <input
            ref={inputRef}
            onBlur={onBlur}
            type="text"
            className={styles.search}
            placeholder="검색"
          />
          {!toggle && (
            <button
              onClick={onClick}
              type="button"
              className={styles.searchDiv}
            >
              <span>
                <i className="fas fa-search" />
              </span>
              <span>검색</span>
            </button>
          )}
        </div>
        <div>
          <i className="fas fa-home" />
          <i className="fab fa-telegram-plane" />
          <i className="far fa-compass" />
          <i className="far fa-heart" />
          <i className="far fa-user-circle" />
        </div>
      </div>
    </header>
  );
};

export default Header;
