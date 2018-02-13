import React from "react";
import ReactDOM from "react-dom";
import { Message } from "../message";
import styled from 'styled-components';

const Container = styled.div`
  height: 60%;
  overflow-y: scroll;
  background: #F8F5F1;
`;

const Div = styled.div`
  margin-bottom: 10px;
`

export class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom(){
    const end = ReactDOM.findDOMNode(this.scrollTarget);
    end.scrollIntoView({ behavior: 'smooth'});
  }

  componentDidUpdate(){
    this.scrollToBottom();
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
        <Div
          style={{ float: 'left', clear: 'both'}}
          ref={el => this.scrollTarget = el} />
      </Container>
    );
  }
}
