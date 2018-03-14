/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import styled from 'styled-components';
import Message from '../message/Message';

const Container = styled.div`
  height: 60%;
  overflow-y: scroll;
  background: #f8f5f1;
`;

const ScrollToDiv = styled.div`
  margin-bottom: 10px;
  float: left;
  clear: both;
`;

export default class Conversation extends Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <Container>
        {this.props.messages.map((messageObj, index) => (
          <Message
            messageObj={messageObj}
            key={index}
            addMessage={this.props.addMessage}
            sendMessage={this.props.sendMessage}
            uniqueId={this.props.uniqueId}
          />
        ))}
        <ScrollToDiv
          innerRef={(el) => { this.scrollTarget = el; }}
        />
      </Container>
    );
  }
}
