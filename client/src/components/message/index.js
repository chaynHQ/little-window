import React from "react";
import "./style.scss";
import Buttons from "../buttons";
import Resources from "../resources";

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.messageObj.speech}</p>
        <Buttons options={this.props.messageObj.options} addMessage={this.props.addMessage} sendMessage={this.props.sendMessage} uniqueId={this.props.uniqueId}/>
        <Resources resources={this.props.messageObj.resources} />
      </div>
    );
  }
}
