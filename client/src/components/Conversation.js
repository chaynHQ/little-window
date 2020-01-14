import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

const Conversation = ({ messages }) => (
  <div className={styles.container}>

    {messages.map((message) => (
      <h1>{message}</h1>
    ))}
  </div>
);

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Conversation;
