import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Buttons from '../buttons/Button';
import Resources from '../resources/Resources';
import SelectOptions from '../select-buttons/SelectOptions';
import catAvatar from '../../assets/catbot.png';


const ellipsis = keyframes`
  to {
    width: 3em;
  }
`;

const Botmessage = styled.p`
  float: left;
  margin-left: 4%;
  margin-right: 20%;
  background-color: #d3d3d3;
  border-radius: 15px;
  padding: 10px;
  min-width: 2.2rem;
  max-width: 60%;

  ${props =>
    props.dotty &&
    css`
      &:after {
        overflow: hidden;
        display: block;
        vertical-align: bottom;
        animation: ${ellipsis} steps(4, end) 1000ms infinite;
        content: '...';
        width: 0px;
      }
    `};
`;

const Usermessage = styled.p`
  float: right;
  background-color: #ffbdbd;
  border-radius: 15px;
  padding: 10px;
  margin-right: 4%;
  max-width: 60%;
  word-wrap: break-word;
`;

const StyledImg = styled.img`
  width: 10%;
  height: 10%;
  margin-top: 1rem;
  margin-left: 2%;
`;

const StyledKittyContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default class Message extends Component {
  static propTypes = {
    messageObj: PropTypes.shape({
      isUser: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        postback: PropTypes.string.isRequired,
        lookup: PropTypes.string,
      })),
      resources: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })),
      selectOptions: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        postback: PropTypes.string.isRequired,
        lookup: PropTypes.string,
      })),
      speech: PropTypes.string.isRequired,
      timedelay: PropTypes.string,
    }).isRequired,
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    uniqueId: PropTypes.string.isRequired,
  }

// speaker function determines if the message is from a user or from the bot,
// and renders the appropriate message & styling
  speaker = messageObj => {
    return messageObj.isUser ? (
      <Usermessage>{messageObj.speech}</Usermessage>
    ) : (
      <StyledKittyContainer>
        <StyledImg src={catAvatar} />
        <Botmessage dotty={messageObj.speech === '' ? 'dotty' : ''}>
          {messageObj.speech}
        </Botmessage>
      </StyledKittyContainer>
    );
  }

  render() {
    const {
      messageObj, addMessage, sendMessage, uniqueId,
    } = this.props;
    const speaker = this.speaker(messageObj);
    return (
      <div>
        {speaker}
        <Buttons
          options={messageObj.options}
          addMessage={addMessage}
          sendMessage={sendMessage}
          uniqueId={uniqueId}
        />
        <Resources resources={messageObj.resources} />

        <SelectOptions
          selectOptions={messageObj.selectOptions}
          addMessage={addMessage}
          sendMessage={sendMessage}
          uniqueId={uniqueId}
        />

      </div>
    );
  }
}
