import React from "react";
import { Header } from "./header";
import { Conversation } from "./conversation";
import { Input } from "./input";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { question: "Can I get a divorce?" },
        { question: "Yes, I want to find out about divorce" }
      ]
    };
  }

  userInput = message => {
    this.setState((prevState, props) => {
      return {
        messages: [...prevState.messages, message]
      };
    });
  };

  refresh = () => {};

  newMessage = () => {};

  render() {
    return (
      <div>
        <Header />
        <Conversation messages={this.state.messages} />
        <Input userInput={this.userInput} />
      </div>
    );
  }
}
