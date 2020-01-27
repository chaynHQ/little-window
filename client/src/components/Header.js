import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/header.module.css';

import Maximise from '../assets/maximise.svg';
import Minimise from '../assets/minimise.svg';
import Refresh from '../assets/refresh.svg';

const Header = ({ minimised, minimiseHandler, refreshHandler }) => (
  <div className={styles.header}>
    <button
      className={styles.icon}
      onClick={() => minimiseHandler()}
      onKeyDown={() => minimiseHandler()}
      type="button"
    >
      <img
        src={minimised ? Maximise : Minimise}
        alt="minimise"
      />
    </button>
    <h1>Little Window</h1>
    <button
      onClick={() => refreshHandler()}
      onKeyDown={() => refreshHandler()}
      className={styles.icon}
      type="button"
    >
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
  minimised: PropTypes.bool,
};

Header.defaultProps = {
  minimised: false,
};

export default Header;
