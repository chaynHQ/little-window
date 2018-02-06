import React, { Component } from "react";

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();

    const data = {};

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="question" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
