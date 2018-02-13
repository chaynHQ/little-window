import React from "react";
import "./style.scss";
import Buttons from "../buttons";
import Resources from "../resources";
import styled from 'styled-components';

const Botmessage = styled.p`
  float: left;
  margin-left: 4%;
  margin-right: 20%;
  background-color: #D3D3D3;
  border-radius: 3%;
  padding: 10px;
`
const Usermessage = styled.p`
  float: right;
  background-color: #FFBDBD;
  border-radius: 3%;
  padding: 10px;
  margin-right: 4%;
`


export class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const speaker = this.props.messageObj.isUser ? <Usermessage>{this.props.messageObj.speech}</Usermessage> : <Botmessage>{this.props.messageObj.speech}</Botmessage>
    return (
      <div>
        {speaker}
        <Buttons options={this.props.messageObj.options} addMessage={this.props.addMessage} sendMessage={this.props.sendMessage} uniqueId={this.props.uniqueId}/>
        <Resources resources={this.props.messageObj.resources} />
      </div>
    );
  }
}
