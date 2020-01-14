import React from 'react';
import '../styles/App.css';
import styles from '../styles/textInput.module.css'

const TextInput = () => {

  // ToDO: Change input text language based on initial user input. Do the same with the words in the header.

  // TODO: Placeholder text here should change based on what is expected from the user. E.g should they type, is the bot currently typing, or should they input?

  return (
      <form className={styles.textInput}>
        <input type="text" className={styles.textInputArea}/>
        <input type="submit" className={styles.textInputSubmitButton}/>
      </form>
  );
};

export default TextInput;
