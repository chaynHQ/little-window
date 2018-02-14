import React from "react";
import "./style.scss";
import styled from "styled-components";

const Botbuttons = styled.div`
  float: left;
  margin-left: 5%;
`;

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
      speech: ""
    };
    this.props.addMessage(data);
    this.props.addMessage(buttonDots);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options) return null;

    if (this.state.disabled) return null;

    return (
      <Botbuttons>
        {this.props.options.map((option, index) => (
          <button
            value={option.postback}
            key={index}
            onClick={() => this.clickHandler(option.text, option.postback)}
          >
            {option.text}
          </button>
        ))}
      </Botbuttons>
    );
  }
}
