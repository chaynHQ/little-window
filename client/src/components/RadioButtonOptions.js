import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/radioButtonOptions.module.css';

const uuidv4 = require('uuid/v4');

const RadioButtonOptions = ({
  options,
  inputHandler,
  selectedOptions,
  selectedOptionsText,
  hasSelectedAnswers,
  hasBeenAnswered,
  radioButtonSelector,
}) => [
  <div className={styles.container} key={uuidv4()}>
    {options.map((option) => (
      <button
        className={`${styles.option} ${option.selected ? styles.selected : ''} radio-button-option`}
        value={option.postback}
        onClick={() => radioButtonSelector(option.text)}
        key={uuidv4()}
        type="button"
        disabled={hasBeenAnswered}
      >
        {option.text}
      </button>
    ))}
  </div>,
  <button
    className={`${styles.option} ${styles.submit} ${hasSelectedAnswers ? styles.canBeSubmitted : ''} radio-button-submit`}
    onClick={() => inputHandler({
      text: selectedOptionsText,
      postback: selectedOptions[0].postback,
      selectedTags: selectedOptions,
    })}
    key={uuidv4()}
    type="button"
    disabled={!hasSelectedAnswers || hasBeenAnswered}
  >
    Submit
  </button>,
];

RadioButtonOptions.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  radioButtonSelector: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOptionsText: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasSelectedAnswers: PropTypes.bool,
  hasBeenAnswered: PropTypes.bool,
};

RadioButtonOptions.defaultProps = {
  hasBeenAnswered: false,
  hasSelectedAnswers: false,
};

export default RadioButtonOptions;
