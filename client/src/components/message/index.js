import React from "react";
import Buttons from "../buttons";
import Resources from "../resources";
import styled, { css } from "styled-components";
import catAvatar from '../../assets/catbot.png';

const Botmessage = styled.p`

    float: left;
    margin-left: 4%;
    margin-right: 20%;
    background-color: #d3d3d3;
    border-radius: 15px;
    padding: 10px;
    min-width: 2.2rem;

  ${props => props.dotty && css`
      &:after {
        overflow: hidden;
        display: block;
        vertical-align: bottom;
        -webkit-animation: ellipsis steps(4, end) 1000ms infinite;
        animation: ellipsis steps(4, end) 1000ms infinite;
        content: "...";
        width: 0px;
      }



      @keyframes ellipsis {
        to {
          width: 3em;
        }
      }

      @-webkit-keyframes ellipsis {
        to {
          width: 3em;
        }
      }
    `}


`;

const Usermessage = styled.p`
  float: right;
  background-color: #ffbdbd;
  border-radius: 15px;
  padding: 10px;
  margin-right: 4%;
  max-width: 60%;
`;

const StyledImg = styled.img`
width: 12%;
height: 12%;
margin-top: 1rem;
margin-left: 2%;
`

const StyledKittyContainer = styled.div`
  display: flex;
  width: 100%;
`

export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const speaker = this.props.messageObj.isUser ? (
      <Usermessage>{this.props.messageObj.speech}</Usermessage>
    ) : (<StyledKittyContainer><StyledImg src={catAvatar} />
      <Botmessage dotty={this.props.messageObj.speech === "" ? "dotty" : ""}>
        {this.props.messageObj.speech}
      </Botmessage>
    </StyledKittyContainer>);
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
