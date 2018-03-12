/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import styled from 'styled-components';
import Message from '../message/Message';

const Container = styled.div`
  height: 60%;
  overflow-y: scroll;
  background: #f8f5f1;
`;

const Div = styled.div`
  margin-bottom: 10px;
`;

export default class Conversation extends React.Component {

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
        <Div
          style={{ float: 'left', clear: 'both' }}
          innerRef={(el) => { this.scrollTarget = el; }}
        />
      </Container>
    );
  }
}
