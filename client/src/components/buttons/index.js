import React from "react";
import "./style.scss";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      isWaiting: true,
      speech,
      uniqueId: this.props.uniqueId
    };
    const buttonDots = {
      speech: "..."
    };
    this.props.addMessage(data);
    this.props.addMessage(buttonDots);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options)
      return null;

    return (
      <div>
        {
          this.props.options.map((option, index) =>
            <button value={option.postback} key={index} onClick={() => this.clickHandler(option.text, option.postback)} disabled={this.state.disabled} >
              {option.text}</button>)
        }
      </div>
    );
  };
}
