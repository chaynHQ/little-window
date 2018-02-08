import React from "react";
import "./style.scss";

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  sendMessage(data) {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (resData.retrigger) {
          console.log(resData);
          this.sendMessage({
            question: resData.retrigger
          });
        }
        const botMessage = {
          isUser: false,
          isWaiting: false,
          question: resData.speech
        };
        this.props.addMessage(botMessage);
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

  handleSubmit(e) {
    // console.log(this.props, "handlesubmit props");
    e.preventDefault();

    const data = {
      isUser: true,
      isWaiting: true
    };

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }
    this.sendMessage(data);
    console.log(this.props);
    this.props.addMessage(data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="question" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
