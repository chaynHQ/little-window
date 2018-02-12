import React from "react";
import "./style.scss";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      isWaiting: true,
      speech
    };

    const buttonDots = {
      speech: "..."
    };

    console.log("postback", postback);
    this.props.addMessage(data);
    this.props.addMessage(buttonDots);
    this.props.sendMessage({ speech: postback });
  }

  render() {
    if (!this.props.options) {
      return null;
    }
    return (
      <div>
        {this.props.options.map((option, index) => {
          return (
            <button
              value={option.postback}
              key={index}
              onClick={() => this.clickHandler(option.text, option.postback)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    );
  }
}
