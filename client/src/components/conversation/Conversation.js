/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill';
import Message from '../message/Message';

// polyfill enables smooth scrollIntoView on browsers that don't yet support { behaviour: smooth }
smoothscroll.polyfill();

// overscroll-behaviour: contain prevents the website from scrolling when the chat is scrolled.
// -webkit-overflow-scrolling: touch enables momentum scrolling on Safari

const Container = styled.div`
  height: 65%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  background: #f8f5f1;
  position: relative;
`;

// This div only exists for the autoscroll so that there is a target
// to be scrolled to
// See scrollToBottom below.
const ScrollToDiv = styled.div`
  margin-bottom: 10px;
  float: left;
  clear: both;
`;

// keyframes for the Loader
const spin = keyframes`
  {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Loader to display where page slow to display
const Loader = styled.div`
  border: 8px solid #e2dfdc;
  border-top: 8px solid grey;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: auto;
  position: relative;
  top: 30%;
  animation: ${spin} 1s linear infinite;
`;

const propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      isUser: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          postback: PropTypes.string.isRequired,
          lookup: PropTypes.string,
        }),
      ),
      resources: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  updateLang: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  uniqueId: PropTypes.string.isRequired,
  minimise: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

const defaultProps = {
  messages: [],
};

class Conversation extends Component {
  // chat window scrolls to bottom each time it updates
  componentDidUpdate() {
    const { minimise } = this.props;

    if (!minimise) {
      this.scrollToBottom();
    }
  }

  // scroll function for scrolling to the end.
  scrollToBottom = () => {
    this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
  };

  // mapping through the messages to render them one by one
  renderMessages = () => {
    const {
      messages, updateLang, addMessage, sendMessage, uniqueId, lang,
    } = this.props;

    return messages.map((messageObj) => (
      <Message
        messageObj={messageObj}
        key={uniqueId}
        updateLang={updateLang}
        addMessage={addMessage}
        sendMessage={sendMessage}
        uniqueId={uniqueId}
        lang={lang}
      />
    ));
  };

  // rendering the conversation. ScrollToDiv is purely for scrolling purposes.
  render() {
    const { messages, minimise } = this.props;
    if (minimise) {
      return null;
    }
    return (
      <Container>
        {messages.length ? this.renderMessages() : <Loader />}
        <ScrollToDiv
          ref={(el) => {
            this.scrollTarget = el;
          }}
        />
      </Container>
    );
  }
}

Conversation.propTypes = propTypes;
Conversation.defaultProps = defaultProps;

export default Conversation;
