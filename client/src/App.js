import React, { Component } from "react";

class App extends Component {
  sendMessage(data) {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (resData.retrigger) {
          console.log(resData)
          this.sendMessage({
            question: resData.retrigger
          })
        } else console.log(resData);
      })
  }

  sendToServer(data) {
    return fetch("/usermessage", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify(data)
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {};

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }
    this.sendMessage(data);
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

export default App;
