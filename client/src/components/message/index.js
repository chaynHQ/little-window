import React from "react";
import "./style.scss";
import Buttons from "../buttons";
import Resources from "../resources";
import styled, { css } from "styled-components";

const Botmessage = styled.p`
  ${props =>
    props.dotty &&
    css`
      &:after {
        content: ".";
        animation: dots 1s steps(5, end) infinite;
      }

      @keyframes dots {
        0%,
        20% {
          color: rgba(0, 0, 0, 0);
          text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        40% {
          color: white;
          text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        60% {
          text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        80%,
        100% {
          text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
        }
      }
    `} float: left;
  margin-left: 4%;
  margin-right: 20%;
  background-color: #d3d3d3;
  border-radius: 3%;
  padding: 10px;
`;
const Usermessage = styled.p`
  float: right;
  background-color: #ffbdbd;
  border-radius: 3%;
  padding: 10px;
  margin-right: 4%;
`;

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const speaker = this.props.messageObj.isUser ? (
      <Usermessage>{this.props.messageObj.speech}</Usermessage>
    ) : (
      <Botmessage dotty={this.props.messageObj.speech === "..." ? "dotty" : ""}>
        {this.props.messageObj.speech}
      </Botmessage>
    );
    return (
      <div>
        {speaker}
        <Buttons
          options={this.props.messageObj.options}
          addMessage={this.props.addMessage}
          sendMessage={this.props.sendMessage}
          uniqueId={this.props.uniqueId}
        />
        <Resources resources={this.props.messageObj.resources} />
      </div>
    );
  }
}
