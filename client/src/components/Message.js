import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/message.module.css';


const Message = ({ text, sender }) => (
  <p className={styles[`${sender}Message`]}>
    {text}
  </p>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.oneOf(['user', 'bot']).isRequired,
};

export default Message;
