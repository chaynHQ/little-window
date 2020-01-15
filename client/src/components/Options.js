import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/options.module.css';

const uuidv4 = require('uuid/v4');

const Options = ({ options, inputHandler }) => (
  <div className={styles.container}>
    {options.map((option) => (
      <button
        className={styles.option}
        value={option.postback}
        onClick={() => inputHandler(option)}
        key={uuidv4()}
        type="button"
      >
        {option.text}
      </button>
    ))}
  </div>
);

Options.propTypes = {
  options: PropTypes.array.isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default Options;
