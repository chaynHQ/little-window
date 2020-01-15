import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

import Message from './Message';
import Options from './Options';

class Conversation extends Component {
  componentDidMount() {
    const { sendMessageToBot } = this.props;

    sendMessageToBot({
      speech: 'Little Window language selection',
      lang: 'en',
    });
  }

  render() {
    const { messages, optionInputHandler } = this.props;
    return (
      <div className={styles.container}>

        {messages.map((message) => (message.options ? ([
          <Message key={`message with options ${message.text}`} text={message.text} type={message.type} />,
          <Options key={`message with options ${message.options}`} options={message.options} optionInputHandler={optionInputHandler} />]
        ) : (
          <Message key={`message ${message.text}`} text={message.text} type={message.type} />
        )))}

      </div>
    );
  }
}

Conversation.propTypes = {
  sendMessageToBot: PropTypes.func.isRequired,
  optionInputHandler: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
