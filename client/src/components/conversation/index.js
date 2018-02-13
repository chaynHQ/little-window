import React from "react";
import { Message } from "../message";
import styled from 'styled-components';

const Container = styled.div`
  height: 60%;
  overflow-y: hidden;
  background: #F8F5F1;

`

export class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {this.props.messages.map((messageObj, index) =>
          <Message
            messageObj={messageObj}
            key={index}
            addMessage={this.props.addMessage}
            sendMessage={this.props.sendMessage}
            uniqueId={this.props.uniqueId}
          />
        )}
      </Container>
    );
  }
}
