import React from "react";
import "./style.scss";
import Buttons from "../buttons";
import Resources from "../resources";

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  // state = {
  //   options: this.props.messageObj.options,
  //   resources: this.props.messageObj.resources
  // };

  render() {
    console.log(this.props);
    return (
      <div>
        <p>{this.props.messageObj.speech}</p>
        {/* <Buttons options={this.props.messageObj.options} />
        <Resources resources={this.props.messageObj.resources} /> */}
      </div>
    );
  }
}
