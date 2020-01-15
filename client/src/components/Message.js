import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/message.module.css';


const Message = ({ text, type }) => (
  <p className={styles[type]}>
    {text}
  </p>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['userMessage', 'resourceMessage', 'botMessage']).isRequired,
};

export default Message;
