import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/message.module.css';

const Message = ({ text, sender, dotty }) => (
  <p className={`${dotty ? styles.dotty : ''} ${styles[`${sender}Message`]}`}>
    {text}
  </p>
);

Message.defaultProps = {
  dotty: false,
};
Message.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.oneOf(['user', 'bot']).isRequired,
  dotty: PropTypes.bool,
};

export default Message;
