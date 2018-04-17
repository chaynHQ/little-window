import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import Maximise from '../../assets/maximise.svg';
import Minimise from '../../assets/minimise.svg';
import Refresh from '../../assets/refresh.svg';

const StyledHeader = styled.div`
  height: 20%;
  padding-top: 15px;
  @media (max-height: 535px) {
    padding-top: 5px;
  }
  background: #ffbdbd;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  position: relative;
  ${props =>
    props.minSize &&
    css`
      height: 100%;
    `};
`;

const RefreshButton = styled.button`
  margin-left: auto;
  align-self: flex-start;
  background: white;
  padding: 5px;
  border-radius: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
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
  @media (max-width: 361px) {
    font-size: 17px;
  }
`;

const MinimiseButton = styled.button`
  align-self: flex-start;
  background: white;
  padding: 5px;
  border-radius: 100%;
  border: none;
  display: flex;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img``;

// RefreshButton refreshes the conversation in App. The property of
// refreshDisabled property disables the refresh button while the bot is typing.
const Header = props => (
  <StyledHeader minSize={props.minimise === true ? 'minSize' : ''}>
    <MinimiseButton onClick={props.minimiseFunc}>
      <Icon
        src={props.minimise ? Maximise : Minimise}
        alt={props.minimise ? 'Maximise' : 'Minimise'}
      />
    </MinimiseButton>
    <RefreshButton onClick={props.refresh} disabled={props.refreshDisabled}>
      <Icon src={Refresh} alt="refresh" />
    </RefreshButton>

    <HeadingText>
      <Styledh1>
        {props.minimise === true ? 'Can I help you?' : 'Little Window'}
      </Styledh1>
    </HeadingText>
  </StyledHeader>
);

Header.propTypes = {
  refresh: PropTypes.func.isRequired,
  refreshDisabled: PropTypes.bool.isRequired,
  minimise: PropTypes.bool.isRequired,
  minimiseFunc: PropTypes.func.isRequired
};

export default Header;
