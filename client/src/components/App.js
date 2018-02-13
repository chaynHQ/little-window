import React from "react";
import { Header } from "./header";
import { Conversation } from "./conversation";
import { Input } from "./input";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputStatus: false
    };
  }

  addMessage = message => {
    if (message.isUser === false) {
      setTimeout(() => {
        this.setState((prevState, props) => {
          return {
            messages: [...prevState.messages, message]
          };
        });
      }, 1000);
    } else {
      this.setState((prevState, props) => {
        return {
          messages: [...prevState.messages, message]
        };
      });
    }
  };

  componentDidUpdate(prevProps, prevState, message) {
    prevState.messages.pop();
    if (prevProps.speech === "...") {
      return {
        message: [...prevState.messages.slice(0, -1), message]
      };
    }
  }

  componentDidMount() {
    console.log(this.props.uniqueId);
    this.sendMessage({
      speech: "Little window welcome",
      uniqueId: this.props.uniqueId
    });
  }

  sendMessage(data) {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (resData.retrigger) {
          this.sendMessage({
            speech: resData.retrigger,
            uniqueId: this.props.uniqueId
          });
        }

        if (resData.options.length === 0) {
          this.setState({ inputStatus: false });
        } else {
          this.setState({ inputStatus: true });
        }
        resData.isUser = false;
        resData.isWaiting = false;
        this.addMessage(resData);
      });
  }

  sendToServer(data) {
    return fetch("/usermessage", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify(data)
    });
  }

  refresh = () => {
    this.setState({
      messages: []
    });

    this.sendMessage({
      speech: "Little window welcome",
      uniqueId: this.props.uniqueId
    });
  };

  render() {
    return (
      <div>
        <Header refresh={this.refresh.bind(this)} />
        <Conversation
          messages={this.state.messages}
          addMessage={this.addMessage.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          uniqueId={this.props.uniqueId}
        />
        <Input
          addMessage={this.addMessage.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          inputStatus={this.state.inputStatus}
          uniqueId={this.props.uniqueId}
        />
      </div>
    );
  }
}
