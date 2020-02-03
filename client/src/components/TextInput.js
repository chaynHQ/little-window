import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';
import styles from '../styles/textInput.module.css';

import translations from '../assets/translations';

const TextInput = ({
  inputHandler, lang, status, disabled,
}) => {
  const [input, setInput] = useState('');

  return (
    <form
      className={styles.textInput}
      onSubmit={(e) => {
        e.preventDefault();
        inputHandler({ text: [input], postback: input });
        setInput('');
      }}
    >
      <input
        type="text"
        className={styles.textInputArea}
        disabled={disabled}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={translations[`${status}InputBoxText`][lang]}
      />
      <input
        type="submit"
        disabled={disabled || input.length < 1}
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
  disabled: PropTypes.bool,
};
export default TextInput;
