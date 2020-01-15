import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/options.module.css';


const Options = ({ options, optionInputHandler }) => (
  <div className={styles.container}>
    {options.map((option) => (
      <button
        className={styles.option}
        value={option.postback}
        onClick={() => optionInputHandler(option)}
        key={`option ${option.postback} ${option.text}`}
        type="button"
      >
        {option.text}
      </button>
    ))}
  </div>
);

Options.propTypes = {
  options: PropTypes.array.isRequired,
  optionInputHandler: PropTypes.func.isRequired,
};

export default Options;
