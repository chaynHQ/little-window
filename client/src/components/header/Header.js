import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  height: 20%;
  background: #ffbdbd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  position: relative;
`;

const RefreshButton = styled.button`
  align-self: flex-end;
  background: white;
  padding: 5px;
  border-radius: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  margin-right: 3px;
  cursor: pointer;
`;

const Icon = styled.i`

`;

const HeadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Styledh1 = styled.h1`
  margin: 0;
  font-size: 20px;
`;

const MinimiseButton = styled.button`
align-self: flex-start;
background: white;
padding: 5px;
border-radius: 100%;
border: none;
display: flex;
justify-content: center;
align-items: center;
margin-top: -20px;
margin-left: 3px;
height: 22px;
width: 22px;
cursor: pointer;
`;

// RefreshButton refreshes the conversation in App. The property of
// refreshDisabled property disables the refresh button while the bot is typing.
const Header = props => (
  <StyledHeader>
    <RefreshButton onClick={props.refresh} disabled={props.refreshDisabled}>
      <Icon className="fas fa-sync-alt" />
    </RefreshButton>
    <MinimiseButton>X</MinimiseButton>
    <HeadingText>
      <Styledh1>Little Window</Styledh1>
    </HeadingText>
  </StyledHeader>
);

Header.propTypes = {
  refresh: PropTypes.func.isRequired,
  refreshDisabled: PropTypes.bool.isRequired,
};

export default Header;
