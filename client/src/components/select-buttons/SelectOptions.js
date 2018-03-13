import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const SelectOptionsDiv = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
`;

const CountryOptionDiv = styled.div`
  border: 2px #b0b0b0 solid;
  color: #b0b0b0;
  background: white;
  margin-bottom: 20px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 15px;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }

  ${props =>
    props.active &&
    css`
      background: red;
      color: white;
    `};
`;

const SubmitButton = styled.button.attrs({
  disabled: props => props.disabled,
})`
  margin: auto;
  border: 2px #b0b0b0 solid;
  color: white;
  background: green;
  display: block;
  border-radius: 15px;
  font-size: 1rem;
  padding-top: 3px;
  padding-bottom: 4px;
  width: 5rem;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background: white;
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

export default class SelectOptions extends Component {
  static defaultProps = {
    selectOptions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      activeOptions: props.selectOptions.map(() => false),
    };
  }

  countryOptionClickHandler = (selectOption, index) => {
    this.setState((prevState) => {
      let newActiveOptions = Array.from(prevState.activeOptions);
      newActiveOptions[index] = !newActiveOptions[index];

      if (selectOption.text === 'None of the above') {
        newActiveOptions = newActiveOptions.map((value, optionIndex) => {
          if (optionIndex !== index) return false;
          return value;
        });
      } else newActiveOptions[newActiveOptions.length - 1] = false;

      return { activeOptions: newActiveOptions };
    });
  }

  renderSelectOptions = () => this.props.selectOptions.map((selectOption, index) => (
    <CountryOptionDiv
      key={selectOption.text}
      active={this.state.activeOptions[index] ? 'active' : ''}
      onClick={() => this.countryOptionClickHandler(selectOption, index)}
    >
      {selectOption.text}
    </CountryOptionDiv>
  ));

  render() {
    if (this.props.selectOptions.length < 1) return null;

    const optionSelectedBool = this.state.activeOptions.some(Boolean);

    return (
      <div>
        <SelectOptionsDiv>{this.renderSelectOptions()}</SelectOptionsDiv>
        <SubmitButton disabled={optionSelectedBool ? '' : 'disabled'}>Submit</SubmitButton>
      </div>
    );
  }
}
