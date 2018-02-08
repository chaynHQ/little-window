import React from "react";
import "./style.scss";
import Buttons from "../buttons";
import Resources from "../resources";

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    options: this.props.messageObj.options,
    resources: this.props.messageObj.resources
  };

  render() {
    console.log(this.props);
    return (
      <div key={this.props.index}>
        <p>{this.props.messageObj.question}</p>
        {/* <Buttons options={this.state.options} /> */}
        {/* <Resources options={this.state.options} /> */}
      </div>
    );
  }
}
