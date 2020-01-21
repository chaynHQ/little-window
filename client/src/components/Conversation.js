import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import ScrollableFeed from 'react-scrollable-feed';
import styles from '../styles/conversation.module.css';

import Message from './Message';
import CheckBoxOptions from './CheckBoxOptions';
import RadioButtonOptionsContainer from './RadioButtonOptionsContainer';
import TextInput from './TextInput';

import botAvatar from '../assets/catbot.png';

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

  renderMessage = (currentMessage, inputHandler) => {
    const message = [];

    if (currentMessage.sender === 'bot') {
      message.push(
        <div key={uuidv4()} className={styles.botAvatarAndMessageContainer}>
          <img key={uuidv4()} alt="Bot Avatar" src={botAvatar} className={styles.botAvatar} />
          <Message key={uuidv4()} text={currentMessage.text} sender={currentMessage.sender} />
        </div>,
      );
    } else {
      message.push(
        <Message key={uuidv4()} text={currentMessage.text} sender={currentMessage.sender} />,
      );
    }

    if (currentMessage.checkBoxOptions && currentMessage.checkBoxOptions.length > 0) {
      message.push(
        <CheckBoxOptions
          key={uuidv4()}
          options={currentMessage.checkBoxOptions}
          inputHandler={inputHandler}
        />,
      );
    }

    if (currentMessage.radioButtonOptions && currentMessage.radioButtonOptions.length > 0) {
      message.push(
        <RadioButtonOptionsContainer
          key={uuidv4()}
          message={currentMessage}
          inputHandler={inputHandler}
        />,
      );
    }

    return message;
  }


  render() {
    const {
      displayedMessages, inputHandler, lang,
    } = this.props;
    const nextUserAction = displayedMessages.slice(-1)[0]
      ? displayedMessages.slice(-1)[0].nextUserAction : 'wait';

    return (
      <div className={styles.container}>
        <ScrollableFeed forceScroll className={styles.messagesContainer}>

          {displayedMessages.map((message) => this.renderMessage(message, inputHandler))}

          { nextUserAction === 'wait'
            ? (
              <div className={styles.botAvatarAndMessageContainer}>
                <img
                  key={uuidv4()}
                  src={botAvatar}
                  className={styles.botAvatar}
                  alt="Bot Avatar"
                />
                <Message key={uuidv4()} text="" sender="bot" dotty />
              </div>
            )
            : null }

        </ScrollableFeed>
        <TextInput inputHandler={inputHandler} lang={lang} status={nextUserAction} disabled={nextUserAction !== 'input'} />
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
