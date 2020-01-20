import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import ScrollableFeed from 'react-scrollable-feed';
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

  componentDidUpdate() {
    const { queueNextMessage } = this.props;
    queueNextMessage();
  }

  render() {
    const { displayedMessages, inputHandler, lang } = this.props;
    const nextUserAction = displayedMessages.slice(-1)[0] ? displayedMessages.slice(-1)[0].nextUserAction : 'wait';

    return (
      <div className={styles.container}>
        <ScrollableFeed forceScroll className={styles.messageDisplay}>

          {displayedMessages.map((message) => (message.options ? ([
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

        </ScrollableFeed>
        <TextInput inputHandler={inputHandler} lang={lang} status={nextUserAction} />
      </div>
    );
  }
}

Conversation.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  initialBotMessageHandler: PropTypes.func.isRequired,
  queueNextMessage: PropTypes.func.isRequired,
  displayedMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
  lang: PropTypes.string.isRequired,
};

export default Conversation;
