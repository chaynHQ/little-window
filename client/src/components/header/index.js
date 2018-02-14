import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  height: 20%;
  background: #ffbdbd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  box-sizing: border-box;
`;

const RefreshButton = styled.button`
  align-self: flex-end;
  background: white;
  padding: 3px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 3px;
  margin-right: 3px;
`;

const Icon = styled.i``;

const HeadingText = styled.div`
  text-align: center;
  padding-top: 3%;
`;

const Styledh1 = styled.h1`
  margin: 0;
  font-size: 20px;
`;

export class Header extends React.Component {
  render() {
    return (
      <StyledHeader>
        <RefreshButton onClick={this.props.refresh}>
          <Icon className="fas fa-sync-alt" />
        </RefreshButton>
        <HeadingText>
          <Styledh1>Little Window</Styledh1>
        </HeadingText>
      </StyledHeader>
    );
  }
}
