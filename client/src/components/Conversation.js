import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

import Message from './Message';
import Options from './Options';
import TextInput from './TextInput';

const uuidv4 = require('uuid/v4');

class Conversation extends Component {
  componentDidMount() {
    const { initialBotMessageHandler } = this.props;

    initialBotMessageHandler({
      speech: 'Little Window language selection',
      lang: 'en',
    });
  }

  render() {
    const { messages, inputHandler, lang } = this.props;

    const nextUserAction = messages.slice(-1)[0] ? messages.slice(-1)[0].nextUserAction : 'wait';

    return (
      <div className={styles.container}>
        <div className={styles.messageDisplay}>

          {messages.map((message) => (message.options ? ([
            <Message key={uuidv4()} text={message.text} sender={message.sender} />,
            <Options
              key={uuidv4()}
              options={message.options}
              question={message.text}
              inputHandler={inputHandler}
            />]
          ) : (
            <Message key={uuidv4()} text={message.text} sender={message.sender} />
          )))}

        </div>
        <TextInput inputHandler={inputHandler} lang={lang} status={nextUserAction} />
      </div>
    );
  }
}

Conversation.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  initialBotMessageHandler: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

export default Conversation;
