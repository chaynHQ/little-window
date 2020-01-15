import React from 'react';
import '../styles/App.css';
import styles from '../styles/header.module.css';

// import Maximise from '../assets/maximise.svg';
import Minimise from '../assets/minimise.svg';
import Refresh from '../assets/refresh.svg';

const Header = () => (
  <div className={styles.header}>
    <img src={Minimise} alt="minimise" />
    <h1>Can I help you?</h1>
    <img src={Refresh} alt="refresh" />
  </div>
);


export default Header;
