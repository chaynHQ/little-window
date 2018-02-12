import React from "react";
import { Message } from "../message";
import "./style.scss";

export class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.messages.map((messageObj, index) => {
      return <Message messageObj={messageObj} key={index} addMessage={this.props.addMessage}/>;
    });
  }
}
