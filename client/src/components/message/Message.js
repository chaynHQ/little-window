import React from 'react';
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
`;

const StyledImg = styled.img`
  width: 12%;
  height: 12%;
  margin-top: 1rem;
  margin-left: 2%;
`;

const StyledKittyContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Message = props => {
  const { messageObj, addMessage, sendMessage, uniqueId } = props;

  const speaker = messageObj.isUser ? (
    <Usermessage>{messageObj.speech}</Usermessage>
  ) : (
    <StyledKittyContainer>
      <StyledImg src={catAvatar} />
      <Botmessage dotty={messageObj.speech === '' ? 'dotty' : ''}>
        {messageObj.speech}
      </Botmessage>
    </StyledKittyContainer>
  );
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
};

export default Message;
