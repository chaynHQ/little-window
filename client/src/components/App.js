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
    this.setState((prevState, props) => {
      return {
        messages: [...prevState.messages, message]
      };
    });
  };

    sendMessage(data) {
      this.sendToServer(data)
        .then(res => res.json())
        .then(resData => {
          if (resData.retrigger) {
            console.log(resData);
            this.sendMessage({
              speech: resData.retrigger
            });
          }
        
          if (resData.options.length === 0) {
            this.setState({inputStatus: false})
          } else {
            this.setState({inputStatus: true})
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
      messages: [

      ]
    })
  };

  render() {
    return (
      <div>
        <Header />
        <Conversation messages={this.state.messages} addMessage={this.addMessage.bind(this)} sendMessage={this.sendMessage.bind(this)}/>
        <Input addMessage={this.addMessage.bind(this)} sendMessage={this.sendMessage.bind(this)} inputStatus={this.state.inputStatus} />
      </div>
    );
  }
}
