/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Message from '../message/Message';


const Container = styled.div`
  height: 65%;
  overflow-y: scroll;
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
  border: 8px solid #E2DFDC;
  border-top: 8px solid grey;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: auto;
  position: relative;
  top: 30%;
  animation: ${spin} 1s linear infinite;
`;

export default class Conversation extends Component {
  // prop-types module used to specify the types of the props
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      isUser: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        postback: PropTypes.string.isRequired,
        lookup: PropTypes.string,
      })),
      resources: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })),
    })),
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    uniqueId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    messages: [],
  };

  // chat window scrolls to bottom each time it updates
  componentDidUpdate() {
    this.scrollToBottom();
  }

  // scroll function for scrolling to the end.
  scrollToBottom = () => {
    this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
  };


  Conversation = (props) => {
    if (this.props.minimise) {
      return null;
    }
  };

  // mapping through the messages to render them one by one
  renderMessages = () =>
    this.props.messages.map((messageObj, index) => (
      <Message
        messageObj={messageObj}
        key={index}
        addMessage={this.props.addMessage}
        sendMessage={this.props.sendMessage}
        uniqueId={this.props.uniqueId}
      />
    ));

  // rendering the conversation. ScrollToDiv is purely for scrolling purposes.
  render() {
    const { messages } = this.props;
    return (
      <Container>
        {messages.length ? this.renderMessages() : <Loader />}
        <ScrollToDiv
          innerRef={(el) => {
            this.scrollTarget = el;
          }}
        />
      </Container>
    );
  }
}
