import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

import Message from './Message';
import Options from './Options';
import TextInput from './TextInput';

class Conversation extends Component {
  componentDidMount() {
    const { initialBotMessageHandler } = this.props;

    initialBotMessageHandler({
      speech: 'Little Window language selection',
      lang: 'en',
    });
  }

  render() {
    const { messages, inputHandler } = this.props;
    const uuidv4 = require('uuid/v4');
    return (
      <div className={styles.container}>
        <div className={styles.messageDisplay}>

          {messages.map((message) => (message.options ? ([
            <Message key={uuidv4()} text={message.text} type={message.type} />,
            <Options
              key={uuidv4()}
              options={message.options}
              question={message.text}
              inputHandler={inputHandler}
            />]
          ) : (
            <Message key={uuidv4()} text={message.text} type={message.type} />
          )))}

        </div>
        <TextInput inputHandler={inputHandler} />
      </div>
    );
  }
}

Conversation.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  initialBotMessageHandler: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
