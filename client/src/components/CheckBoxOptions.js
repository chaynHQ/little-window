import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/checkBoxOptions.module.css';

const uuidv4 = require('uuid/v4');

const CheckBoxOptions = ({ options, inputHandler }) => (
  <div className={styles.container}>
    {options.map((option) => (
      <button
        className={styles.option}
        value={option.postback}
        onClick={() => inputHandler({
          text: [option.text],
          postback: option.postback,
          lang: option.lang,
        })}
        key={uuidv4()}
        type="button"
      >
        {option.text}
      </button>
    ))}
  </div>
);

CheckBoxOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default CheckBoxOptions;
