import React from "react";
import "./style.scss";

export class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.sendMessage({
      speech: "Little window welcome"
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
    this.props.sendMessage(data);
    console.log(this.props);
    this.props.addMessage(data);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="speech" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
