import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/header.module.css';

import Maximise from '../assets/maximise.png';
import Minimise from '../assets/minimise.png';
import Refresh from '../assets/refresh.svg';

const Header = ({ minimised, minimiseHandler, refreshHandler }) => (
  <div className={`${styles.header} ${minimised ? styles.minimised : ''}`}>
    <button
      className={`${styles.icon} minimise-button`}
      onClick={() => minimiseHandler(!minimised)}
      onKeyDown={() => minimiseHandler(!minimised)}
      type="button"
    >
      <img
        src={minimised ? Maximise : Minimise}
        alt="minimise"
      />
    </button>
    <h1>{ minimised ? 'Can I help you?' : 'Little Window'}</h1>
    <button
      onClick={() => refreshHandler()}
      onKeyDown={() => refreshHandler()}
      className={`${styles.icon} ${minimised ? styles.hidden : ''} refresh-button`}
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
