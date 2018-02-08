import React from "react";
import "./style.scss";

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    console.log(this.props, "handlesbutmit props");
    e.preventDefault();

    const data = {
      isUser: true,
      isWaiting: true
    };

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }

    this.props.userInput(data);

    fetch("/usermessage", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="question" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
