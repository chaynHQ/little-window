import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';
import styles from '../styles/textInput.module.css';

import translations from '../assets/translations.js';

const TextInput = ({ inputHandler, lang, status }) => {
  let input;

  // ToDO: Change input text language based on initial user input. Do the same with the words in the header.

  // TODO: Placeholder text here should change based on what is expected from the user. E.g should they type, is the bot currently typing, or should they input?

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
        placeholder={translations[`${status}InputBoxText`][lang]}
      />
      <input
        type="submit"
        className={styles.textInputSubmitButton}
        value={translations.submitButtonText[lang]}
      />
    </form>
  );
};


TextInput.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
export default TextInput;
