import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';
import styles from '../styles/textInput.module.css';

import translations from '../assets/translations';

const TextInput = ({ inputHandler, lang, status, disabled }) => {
  let input;

  return (
    <form
      className={styles.textInput}
      onSubmit={(e) => {
        e.preventDefault();
        inputHandler({ text: input.value, postback: input.value });
        input.value = null;
      }}
    >
      <input
        type="text"
        className={styles.textInputArea}
        ref={(node) => {
          input = node;
        }}
        disabled = {disabled}
        placeholder={translations[`${status}InputBoxText`][lang]}
      />
      <input
        type="submit"
        disabled = {disabled}
        className={styles.textInputSubmitButton}
        value={translations.submitButtonText[lang]}
      />
    </form>
  );
};

TextInput.defaultProps = {
  disabled: true,
};
TextInput.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
export default TextInput;
