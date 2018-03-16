/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Message from '../message/Message';

const Container = styled.div`
  height: 60%;
  overflow-y: scroll;
  background: #f8f5f1;
  position: relative;
`;

const Div = styled.div`
  margin-bottom: 10px;
`;

const spin = keyframes`
  {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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

export default class Conversation extends React.Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
  };

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

  render() {
    const { messages } = this.props;
    return (
      <Container>
        {messages.length ? this.renderMessages() : <Loader />}
        <Div
          style={{ float: 'left', clear: 'both' }}
          innerRef={(el) => {
            this.scrollTarget = el;
          }}
        />
      </Container>
    );
  }
}
