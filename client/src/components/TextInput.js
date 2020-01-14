import React from 'react';
import '../styles/App.css';
import styles from '../styles/textInput.module.css'

const TextInput = () => {

  return (
    <div className={styles.textInput}>
      <form>
        <input type="text" className={styles.textInputArea}/>
        <input type="submit" className={styles.textInputSubmitButton}/>
      </form>
    </div>
  );
};


export default TextInput;

// <Form onSubmit={this.handleSubmit}>
//   <StyledInput
//     type="text"
//     name="speech"
//     autoComplete="off"
//     showInput={inputStatus}
//     placeholder={
//       inputStatus
//         ? inputMessage
//         : inputPlaceholderLang(lang)
//     }
//     value={term}
//     onChange={(event) => this.onInputChange(event.target.value)}
//     disabled={inputStatus}
//   />
//   <StyledSubmitInput showInput={inputStatus} type="submit" value={submitText} greaterThan6={submitText.length > 6} />
// </Form>
