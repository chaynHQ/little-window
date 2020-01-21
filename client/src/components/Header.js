import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/header.module.css';

// import Maximise from '../assets/maximise.svg';
import Minimise from '../assets/minimise.svg';
import Refresh from '../assets/refresh.svg';

const Header = ({ minimiseHandler, refreshHandler }) => (
  <div className={styles.header}>
    <button
      className={styles.icon}
      onClick={() => minimiseHandler()}
      onKeyDown={() => minimiseHandler()}>
      <img
        src={Minimise}
        alt="minimise"
      />
    </button>
    <h1>Little Window</h1>
    <button
      onClick={() => refreshHandler()}
      onKeyDown={() => refreshHandler()}
      className={styles.icon}>
      <img
        src={Refresh}
        alt="refresh"
      />
    </button>
  </div>
);

Header.propTypes = {
  minimiseHandler: PropTypes.func.isRequired,
  refreshHandler: PropTypes.func.isRequired,
};

export default Header;
