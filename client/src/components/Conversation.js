import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

import Message from './Message'

const Conversation = ({ messages }) => (
  <div className={styles.container}>

    {messages.map((message) => (
      // ToDO: These need a key
      <Message text={message.text} type={message.type}/>
    ))}

  </div>
);

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Conversation;
