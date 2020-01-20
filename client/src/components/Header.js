import React from 'react';
import '../styles/App.css';
import styles from '../styles/header.module.css';

// import Maximise from '../assets/maximise.svg';
import Minimise from '../assets/minimise.svg';
import Refresh from '../assets/refresh.svg';

// TODO: Change H1 to Can I help you in fr/en if minimised
const Header = () => (
  <div className={styles.header}>
    <img className={styles.icon} src={Minimise} alt="minimise" />
    <h1>Little Window</h1>
    <img className={styles.icon} src={Refresh} alt="refresh" />
  </div>
);


export default Header;
