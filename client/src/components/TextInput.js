import React from 'react';
import { connect } from 'react-redux';
import { addUserInput } from '../actions';

import '../styles/App.css';
import styles from '../styles/textInput.module.css';

let TextInput = ({ dispatch }) => {
  let input;

  // ToDO: Change input text language based on initial user input. Do the same with the words in the header.

  // TODO: Placeholder text here should change based on what is expected from the user. E.g should they type, is the bot currently typing, or should they input?

  return (
    <form
      className={styles.textInput}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addUserInput(input.value));
        input.value = null;
      }}
    >
      <input
        type="text"
        className={styles.textInputArea}
        ref={(node) => {
          input = node;
        }}
      />
      <input type="submit" className={styles.textInputSubmitButton} />
    </form>
  );
};

TextInput = connect()(TextInput);
export default TextInput;
