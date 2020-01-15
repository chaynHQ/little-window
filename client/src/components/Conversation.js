import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/conversation.module.css';

import Message from './Message'

class Conversation extends Component {
  componentDidMount() {
    this.props.sendMessageToBot({
      speech: 'Little Window language selection',
      lang: 'en',
    })
  }

    render() {
      const {messages} = this.props
      return (
        <div className={styles.container}>

          {messages.map((message) => (
            // ToDO: These need a key
            <Message text={message.text} type={message.type}/>
          ))}

        </div>
      )
    }
  }

// sendMessage({
//   speech: 'Little Window language selection',
//   uniqueConversationId: uniqueConversationId,
//   lang: 'en',
// });

Conversation.propTypes = {
  sendMessageToBot: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
};

export default Conversation;
